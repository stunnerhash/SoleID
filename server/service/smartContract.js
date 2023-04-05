import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto'

import xmlData from "./parseAdhaar.js";
const filePath = '../adhaarXML/adhaar.xml';

xmlData(filePath)
  .then(generalInfo=>console.log(generalInfo))
  .catch(err=>console.log(err));

const users = [];

// Set up the Express app
const app = express();
app.use(bodyParser.json());

// Define an endpoint for creating a new user
app.post('/users', (req, res) => {
  const {name, email, publicKey } = req.body;
  // Generate a unique ID for the user
  const id = crypto.randomBytes(16).toString('hex');
  // Store the user's data in memory
  users.push({ id, name, email, publicKey });
  // Return the new user ID to the client
  res.json({ id });
});

// Define an endpoint for getting a user's public key by ID
app.get('/users/:id/public-key', (req, res) => {
  const { id } = req.params;
  // Find the user with the given ID
  const user = users.find(u => u.id === id);
  // If the user is not found, return a 404 error
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Return the user's public key to the client
  res.json({ publicKey: user.publicKey });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
