import express from 'express';
import User from '../models/user.js'
import Organization from '../models/organization.js';
import crypto from 'crypto';

import Transaction from '../models/transaction.js';
const router = express.Router();

export const createOrganization = async (req, res) => {
    const {name} = req.body;
	const organizationId = crypto.randomBytes(6).toString('hex');
	const newOrganization = new Organization({organizationId, name});
	try{
		await newOrganization.save();
        res.status(201).json(newOrganization);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: 'Failed to create Organization' });
	}
};
export const getOrganizationPublicKey = async(req,res) => {
	const organizationId = req.params.id;
	try{
		const organization = await Organization.findOne({ organizationId: organizationId});
		if(!organization){
			return res.status(404).json({error: 'Organization not found'});
		}	
		res.json({ publicKey: organization.publicKey });
	}
	catch(err){
		console.log()
		res.status(500).json({error: 'Failed to get organization public key'});
	}
};
export const getTransactionByOrganization= async (req, res) => {
	const organizationId = req.params.id;
	try{
		const transactions = await Transaction.find({ organizationId: organizationId});
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
export const makeTransactionToUser = async(req,res) =>{
	try{
		const organizationId = req.params.id;
		const {userId, fields, description} = req.body;
		// transactionId is set
		const transactionId = crypto.randomBytes(8).toString('hex');
		const latestTransaction = await Transaction.find().limit(1).sort({'lastUpdated':-1});
		const hashCode = latestTransaction.length > 0
			? crypto.createHash('sha256', transactionId)
					.update(latestTransaction[0].hashCode)
					.digest('hex')
			: "this is soleid's genesis block";

		const timeStamp = (new Date()).getTime();
		// Find the organization making the transaction and add ref to transaction 
		const organization = await Organization.findOne({ organizationId: organizationId});
		if (!organization) {
			return res.status(404).json({ message: 'Organization not found' });
		}// organization.transactions.push(transactionId);
		// await organization.save();
		
		// Find the user to whom the transaction is being made and add ref to transaction
		const user = await User.findOne({userId:userId});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}// user.transactions.push(transactionId);
		// await user.save();
		
		const newTransaction = new Transaction({timeStamp, transactionId, organizationName:organization.name, organizationId, userId , fields, description,hashCode});
		await newTransaction.save();
		
		// new request object is created
		return res.status(201).json(newTransaction);
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const getUserResponseToTrasaction = async (req, res) => {
	try {
		const { transactionId } = req.params;
		const transaction = await Transaction.findOne({transactionId:transactionId});
		console.log(transaction);
		if (!transaction) {
			return res.status(404).json({ message: 'Transaction not found' });
		}
		if (transaction.status  === 'rejected') {
			return res.status(400).json({ message: 'Transaction request was rejected by user' });
		}
		else if (transaction.status === 'pending'){
			return res.status(400).json({message : 'Transaction is still pending'});
		}

		const requiredFields = {};
		for (const [key, value] of Object.entries(transaction.fields)) {
			if (value.isRequired) {
				requiredFields[key] = value.value;
			}
		}
		const requiredFieldsJSON = JSON.parse(JSON.stringify(requiredFields));
		return res.status(200).json(requiredFieldsJSON);
	} 
	catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default router;