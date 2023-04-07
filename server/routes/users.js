import express from 'express';
import auth from '../middleware/auth.js'
import {createUser,getUser,updateUser,deleteUser, getUserTransactions, getTransactionById, respondToTransaction} from '../controllers/userController.js';

const router = express.Router();

// Route for CRUD on user
router.get('/', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Route to view requests made to the user
router.get('/:id/transactions', getUserTransactions);	

// Route to view a specific request made by the user
router.get('/:id/transactions/:transactionId', getTransactionById);

// Route to respond to a request made by the user
router.put('/:id/transactions/:transactionId', respondToTransaction);

export default router;
