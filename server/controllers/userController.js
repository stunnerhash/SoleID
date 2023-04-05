import express from 'express';
import Transaction from '../models/transaction.js';
import crypto from 'crypto';

import User from '../models/user.js';
const router = express.Router();

export const createUser = async (req, res) => {
	const { name, email, phone, careof, gender, dob, address, adhaar } = req.body;
	const userId = crypto.randomBytes(6).toString('hex');
	const newUser = new User({
		userId, name, email, phone, careof, gender, dob, address, adhaar
	});
	try{
		await newUser.save();
        res.status(201).json(newUser);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: 'Failed to create user' });
	}
};

export const updateUser = async (req, res) => {
	const { userId } = req.params;
	const update = req.body;

	try {
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
	const { id } = req.params;
	try {
		const user = await User.findOneAndDelete({ userId: id });
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
	const userId = req.params.id;
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

// update such that :id is used for verifying if the user or organization is correct
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
	const userId = req.params.id;
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
		// updated transaction
		const fields = {};
		Object.entries(user.toObject()).forEach(([key, value]) => {
			if (transaction.fields[key] && transaction.fields[key].isRequired) {
				fields[key] = { value, isRequired: true };
			}
		});
		// Update the transaction with the fields
		transaction.fields = fields;
		// await transaction.save();
		res.status(200).json(transaction);
	}
	catch(err){
		console.log(err);
		res.status(500).json({error: 'Failed to respond to Transaction'})
	}
};

export default router;