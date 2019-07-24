module.exports = (app) => {
    const emails = require('../controllers/email.controller.js');

    // Create a new Email - Ethereum address pairing
    app.post('/emails', emails.create);

    // Retrieve all stored Emails
    app.get('/emails', emails.findAll);

    // Retrieve a single email with email
    app.get('/emails/:email', emails.findOne);

    // Update an email with email
    app.put('/emails/:email', emails.update);

    // Delete an email with email
    app.delete('/emails/:email', emails.delete);
}