const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    _id: String,
    ethaddr: String,
    name: String,
    desc: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Email', EmailSchema);