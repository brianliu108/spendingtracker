const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    recurring: Boolean,
    recurringInverval: String,
    endDate: Date
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;