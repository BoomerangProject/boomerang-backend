const Email = require('../models/email.model.js');

// Create and Save a new Email - ETH address pairing
exports.create = (req, res) => {
    // Validate request
    if(!req.body.ethaddr) {
        return res.status(400).send({
            message: "Email must contain a correspondeing public Ethereum address"
        });
    }

    if(!req.body._id) {
        return res.status(400).send({
            message: "Email entry must contain an email... ;)."
        });
    }

    // Create an Email entry
    const email = new Email({
        _id: req.body._id, 
        ethaddr: req.body.ethaddr,
        name: req.body.name || "Unnamed",
        desc: req.body.desc || "No Description..."
    });

    // Save email entry in the database
    email.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Email entry."
        });
    });
};

// Retrieve and return all Email Addresses from the database.
exports.findAll = (req, res) => {
    Email.find()
    .then(emails => {
        res.send(emails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving email entries."
        });
    });
};

// Find a single Email Address entry with an email address
exports.findOne = (req, res) => {
    Email.findById(req.params.email)
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });            
        }
        res.send(email);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving email with id " + req.params.email
        });
    });
};

// Update an Email Address identified by the Email Address in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.desc) {
        return res.status(400).send({
            message: "Name and description of individual or business can not be empty"
        });
    }

    // Find email and update it with the request name and description
    Email.findByIdAndUpdate(req.params.email, {
        name: req.body.name || "Unnamed",
        desc: req.body.desc || "No Description..."
    }, {new: true})
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });
        }
        res.send(email);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error updating email with id " + req.params.email
        });
    });

};

// Delete an Email Address with the specified Email Address in the request
exports.delete = (req, res) => {
    Email.findByIdAndRemove(req.params.email)
    .then(email => {
        if(!email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });
        }
        res.send({message: "Email deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Could not delete email with id " + req.params.email
        });
    });
};