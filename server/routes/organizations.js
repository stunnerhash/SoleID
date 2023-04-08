import express from 'express';
import { createOrganization,getOrganizationPublicKey,getTransactionByOrganization,makeTransactionToUser ,getUserResponseToTrasaction} from '../controllers/orgController.js';
const router = express.Router();

// Route to create a new organization
router.post('/', createOrganization);

// Route to get an organization's public key by ID
router.get('/:id/public-key', getOrganizationPublicKey);

// Route to view requests made by organization
router.get('/:id/transactions', getTransactionByOrganization);

// Route to make requests to user by organization
router.post('/:id/transactions', makeTransactionToUser);

// Route to getUserResponseToRequest
router.get('/:id/transactions/:transactionId', getUserResponseToTrasaction);

export default router;
