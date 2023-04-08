import express from 'express';
import { createOrganization,getOrganization,getOrganizationPublicKey,getTransactionByOrganization,makeTransactionToUser ,getUserResponseToTrasaction} from '../controllers/orgController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Route to create a new organization
router.post('/register', createOrganization);
router.post('/login', getOrganization);

// Route to get an organization's public key by ID
router.get('/:id/public-key',auth, getOrganizationPublicKey);

// Route to view requests made by organization
router.get('/:id/transactions',auth, getTransactionByOrganization);

// Route to make requests to user by organization
router.post('/:id/transactions',auth, makeTransactionToUser);

// Route to getUserResponseToRequest
router.get('/:id/transactions/:transactionId',auth, getUserResponseToTrasaction);

export default router;
