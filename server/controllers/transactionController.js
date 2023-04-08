import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

export const getTransactions = async (req, res) => {
	const transactions = await Transaction.find().sort({'lastUpdated':-1});
	res.status(200).json(transactions);
};

export const getTransactionsById = async (req, res) => {
	const { transactionId } = req.params;
	const transaction = await Transaction.findOne({transactionId});
	res.status(200).json(transaction);
};

export default router;