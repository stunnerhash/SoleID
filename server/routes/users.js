import express from 'express';
import auth from '../middleware/auth.js'
import { createUser, getUser, updateUser, deleteUser, getUserTransactions, getTransactionById, respondToTransaction } from '../controllers/userController.js';

const router = express.Router();

// Route for CRUD on user
router.post('/register', createUser);
router.post('/login', getUser);
router.put('/', auth, updateUser);
router.delete('/', auth, deleteUser);

// Route to view requests made to the user
router.get('/transactions', auth ,getUserTransactions);	

// Route to view a specific request made by the user
router.get('/transactions/:transactionId', auth, getTransactionById);

// Route to respond to a request made by the user
router.put('/transactions/:transactionId', auth, respondToTransaction);

export default router;