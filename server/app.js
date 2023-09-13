import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import organizationRoutes from './routes/organizations.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// const CONNECTION_URL = 'mongodb://localhost:27017/soledb';
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

// Set up the endpoints
app.use('/users', userRoutes);
app.use('/organizations', organizationRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  	console.log(`Server listening on port ${port}`);
});
