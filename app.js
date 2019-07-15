import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import models from './models';

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET All stored emails and ethereum addresses
app.get('/api/v1/emails', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'emails retrieved successfully',
    emails: db,
  })
});

// GET All a single stored email - ethereum address pairing
app.get('/api/v1/emails/:email', (req, res) => {
  const reqEmail = req.query.email
  db.map((email) => {
    if (email.email === reqEmail) {
      return res.status(200).send({
        success: 'true',
        message: 'Email retrieved successfully',
        email,
      });
    } 
});
 return res.status(404).send({
   success: 'false',
   message: 'Email does not exist',
  });
});

// POST Add email and ethereum address to databased
app.post('/api/v1/emails', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send({
      success: 'false',
      message: 'Email is required',
    });
  } else if(!req.query.address) {
    return res.status(400).send({
      success: 'false',
      message: 'Ethereum address is required',
    });
  }
 const email = {
   email: req.query.email,
   address: req.query.address
 }
 models.Email.create(email).then((email) => {
  return res.status(201).send({
     success: 'true',
     message: 'email added successfully',
     email,
   });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});