import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'production'? 
				'https://soleid-server.onrender.com':
				'http://localhost:8000');
const API = axios.create({ baseURL: BASE_URL });
console.log(BASE_URL);
API.interceptors.request.use((req) => {
	const userToken = localStorage.getItem('userToken');
	const organizationToken = localStorage.getItem('organizationToken');
	if (userToken && req.url.startsWith('/users')) {
		req.headers.Authorization = `Bearer ${userToken}`;
	} else if (organizationToken && req.url.startsWith('/organizations')) {
		req.headers.Authorization = `Bearer ${organizationToken}`;
	}
	return req;
});

// user routes
export const createUser = (formData) => API.post('/users/register',formData);
export const getUser = (formData) => API.post('/users/login', formData);
export const updateUser = (updateData) => API.put('/users',updateData)
export const deleteUser = () => API.delete('/users')
export const getUserTransactions = () => API.get('/users/transactions');
export const getTransactionsById = (transactionId) => API.get(`/users/transactions/${transactionId}`);
export const respondToTransaction = (transactionId, status) => API.put(`/users/transactions/${transactionId}`,status);

// organization routes
export const getOrganization = (formData) => API.post('/organizations/login', formData);
export const getTransactionsByOrganization = () => API.get('/organizations/transactions');
export const makeTransactionToUser = (newTransaction) => API.post('/organizations/transactions', newTransaction);
export const getUserResponseToTrasaction = (transactionId) => API.get(`/organizations/transactions/${transactionId}`);