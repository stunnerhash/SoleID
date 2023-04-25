import crypto from 'crypto';
import Transaction from '../models/transaction';


export const verifyTransactions = async() => {
	let previousHash = "this is soleid's genesis block";
	const transactions = Transaction.find().sort({timeStamp:1});
	
	for (let i = 1; i < transactions.length; i++) {
		const transaction = transactions[i];
		const data = JSON.stringify(transaction);

		if (transaction.previousHash !== previousHash) {
			return false;
		}
		const hash = crypto.createHash('sha256').update(data).digest('hex');
		if (hash !== transaction.hash) {
			return false;
		}
		previousHash = hash;
	}
	return true;
}
