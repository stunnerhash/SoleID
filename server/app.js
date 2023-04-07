import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

import userRoutes from './routes/users.js';
import transactionRoutes from './routes/transactions.js'
import orgRoutes from './routes/organizations.js';

const app = express();
app.use(bodyParser.json());

const CONNECTION_URL = 'mongodb+srv://stunnerhash:soleid@cluster.dnxafvm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

// Set up the endpoints
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/organizations', orgRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
