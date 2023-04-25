import express from 'express';
import { createOrganization,getOrganizationPublicKey,getTransactionsByOrganization,makeTransactionToUser ,getUserResponseToTrasaction, getOrganization} from '../controllers/orgController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Route to create a new organization
router.post('/register', createOrganization);
router.post('/login', getOrganization);

// Route to get an organization's public key by ID
router.get('/public-key',auth, getOrganizationPublicKey);

// Route to view requests made by organization
router.get('/transactions',auth, getTransactionsByOrganization);

// Route to make requests to user by organization
router.post('/transactions',auth, makeTransactionToUser);

// Route to getUserResponseToRequest
router.get('/transactions/:transactionId',auth, getUserResponseToTrasaction);

export default router;