import express from 'express';
import Organization from '../models/organization.js';
import crypto from 'crypto';

import Transaction from '../models/transaction.js';
const router = express.Router();

export const createOrganization = async (req, res) => {
    const {name, email, publicKey} = req.body;
	const organizationId = crypto.randomBytes(6).toString('hex');
	const newOrganization= new User({organizationId, name, email, publicKey });
	try{
		await newOrganization.save();
        res.status(201).json(newOrganization);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: 'Failed to create user' });
	}
};
export const getOrganizationPublicKey = async(req,res) => {
	const organizationId = req.params.id;
	try{
		const organization = await Organization.findOne({ organizationId: organizationId});;
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
	
};

export const getUserResponseToTrasaction = async (req, res) => {
	
};

export default router;