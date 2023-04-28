import express from 'express';
import Transaction from '../models/transaction.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import xmlData from '../service/parseAdhaar.js';
import jwt from 'jsonwebtoken';
import Organization  from '../models/organization.js';
const router = express.Router();
const secret = 'test';

const filePath = './adhaarXML/adhaar.xml';

export const getUser = async (req,res) => {
	const {userId,email, password} = req.body;
	try {
		let user;
		if (userId) {
			user = await User.findOne({ userId });
		} else if (email) {
			user = await User.findOne({ email });
		}
		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}
		if (user && user.authenticate(password)) {
			const token = jwt.sign({ id: userId }, secret);
			res.status(200).json({user:user,token:token});
		} else {
			res.status(401).json({ error: 'Wrong password' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Failed to get user' });
	}
}

export const createUser = async (req, res) => {
	const file = req.file;
	const result = await xmlData(file);
	const {name,e,m,dob,gender } = result.generalInfo;
	const {careof,house,street,dist,state,country,pc} = result.addressInfo;
	const address = house + ', ' + street + ', ' + dist + ', ' + state + ', ' + country +', ' + pc;
	const referenceId = (result.referenceId.referenceId);
	const adhaar = "XXXXXXXX" + referenceId.substring(0,4)
	try{
		const userId = crypto.randomBytes(6).toString('hex');
		const user = await User.findOne({email:e});
		if(user) {
			res.status(400).json({error:'User already exists'});
			return;
		}
		const newUser = new User({
			userId, name, email:e, phone:m, careof, gender, dob, address, adhaar
		});
		await newUser.save();
		const token = jwt.sign({ id:userId }, secret);
        res.status(201).json({user:newUser, token:token});
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: 'Failed to create user' });
	}
};

export const updateUser = async (req, res) => {
	// const userId = req.params.id;
	const userId = req.id;
	const update = req.body;
	try {
		if(update.password) {
			update.password = bcrypt.hashSync(update.password, 10); // 10 number of rounds for the hash
		}
		// Use findOneAndUpdate to find the user by ID and update the specified fields
		const updatedUser = await User.findOneAndUpdate(
			{ userId: userId },
			{ $set: update },
			{ new: true } // return the updated document
		);
		if (!updatedUser) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update user' });
	}
};

export const deleteUser = async (req, res) => {
	// const userId = req.params.id;
	const userId = req.id;
	try {
		const user = await User.findOneAndDelete({ userId});
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(204).json({ message: 'User deleted successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Failed to delete user' });
	}
};

export const getUserTransactions= async (req, res) => {
	// const userId = req.params.id;
	const userId = req.id;
	try{
		const transactions = await Transaction.find({ userId: userId});
		if(!transactions){
			return res.status(404).json({error: 'Transactions not found'});
		}	
		res.json(transactions);
	}
	catch(err){
		console.log(err);
		res.status(500).json({error: 'Failed to get transactions'});
	}
};

export const getTransactionById = async (req, res) => {
	const transactionId = req.params.transactionId;
	try{
		const transaction = await Transaction.findOne({ transactionId: transactionId});
		if(!transaction){
			return res.status(404).json({error: 'Transaction not found'});
		}	
		res.json(transaction);
	}
	catch(err){
		console.log(err);
		res.status(500).json({error: 'Failed to get transaction'});
	}
};

export const respondToTransaction = async (req, res) => {
	const transactionId = req.params.transactionId;
	// const userId = req.params.id;
	const userId = req.id;
	const {status} = req.body;
	// Validate input
	if (!['approved', 'rejected'].includes(status)) {
		return res.status(400).json({ error: 'Invalid status' });
	}
	try{
		// find the user
		const user = await User.findOne({ userId: userId });
		if(!user) {
			return res.status(404).json({error:'User not found'});
		}
		// find the transaction
		const transaction = await Transaction.findOneAndUpdate(
			{ transactionId, userId },
			{ status },
			{ new: true },
		);
		if (!transaction) {
			return res.status(404).json({ error: 'Transaction not found' });
		}

		// get organization public key
		const organizationId = transaction.organizationId;
		const organization = await Organization.findOne({ organizationId: organizationId});
		if(!organization){
			return res.status(404).json({error: 'Organization not found, cannot get public key'});
		}	
		const publicKey = organization.publicKey;

		// updated transaction
		const fields = {};
		Object.entries(user.toObject()).forEach(([key, value]) => {
			if (transaction.fields[key] && transaction.fields[key].isRequired) {
				const encryptedValue =  crypto.publicEncrypt(publicKey, Buffer.from(value , 'utf8'));
				fields[key] = { value:encryptedValue.toString('base64'), isRequired: true };
			}
		});
		
		// Update the transaction with the fields
		transaction.fields = fields;
		await transaction.save();
		res.status(200).json(transaction);
	}
	catch(err){
		console.log(err);
		res.status(500).json({error: 'Failed to respond to Transaction'})
	}
};

export default router;