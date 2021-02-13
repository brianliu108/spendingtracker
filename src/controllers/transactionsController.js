const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const validator = require('../models/validators/transactionsValidator');

exports.getTransactions = async (req, res) => {
    let transactions = await Transaction.find({email: req.session.email}).exec();

    res.render('transactions/transactions', {
        transactions: transactions
    });
};

exports.getAdd = async (req, res) => {
    let categories = await Category.find({email: req.session.email}).sort({name: 1}).exec();    
    return res.render('transactions/add', {
        categories: categories,
        incomeChecked: 'checked'
    })
}

exports.postAdd = async (req, res) => {
    let transaction;
    try {
        transaction = new Transaction({
            type: req.body.transactionType,
            categoryName: req.body.transactionCategory,
            date: req.body.transactionDate,
            amount: req.body.transactionAmount,
            note: req.body.transactionNote,
            recurring: req.body.transactionRecurring,
            recurringInterval: req.body.transactionRecurringInterval,
            endDate: req.body.transactionEndDate
        });

        console.log((transaction));
    } catch {
        
    }
};
