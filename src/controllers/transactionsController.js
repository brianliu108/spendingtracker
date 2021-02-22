const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const validator = require('../middleware/validators/transactionsValidator');
const mongodb = require('mongodb');
const {
    format
} = require('date-fns');

exports.getTransactions = async (req, res) => {
    let transactions = await Transaction.find({
            email: req.session.email,
        })
        .sort({
            type: -1,
            amount: -1
        })
        .exec();
    let transactionsIncome = [];
    let transactionsExpense = [];

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type == 'income') transactionsIncome.push(transactions[i]);
        else transactionsExpense.push(transactions[i]);
    }

    res.render('transactions/transactions', {
        transactionsIncome: transactionsIncome,
        transactionsExpense: transactionsExpense
    });
};

exports.getAdd = async (req, res) => {
    let categories;
    let selectedCategory = req.params.category;
    try {
        categories = await Category.find({
            email: req.session.email
        }).sort({
            name: 1
        }).exec();
    } catch {
        return res.redirect('/transactions');
    }
        
    return res.render('transactions/add', {
        categories: categories,
        incomeChecked: 'checked',
        type: req.params.type,
        selectedCategory: selectedCategory
    });
}

exports.postAdd = async (req, res) => {
    let transaction;
    try {
        transaction = new Transaction({
            email: req.session.email,
            type: req.body.transactionType,
            categoryName: req.body.transactionCategory,
            date: req.body.transactionDate,
            amount: req.body.transactionAmount,
            note: req.body.transactionNote,
            recurring: req.body.transactionRecurring,
            recurringInterval: req.body.transactionRecurringInterval,
            endDate: req.body.transactionEndDate
        });

        await transaction.save();

        return res.redirect('/transactions');
    } catch {
        return res.render('transactions/add', {
            errors: ['Error adding. Please try again']
        });
    }
};

exports.getEdit = async (req, res) => {
    let transaction;
    let categories;
    try {
        transaction = await Transaction.findOne({
            _id: new mongodb.ObjectId(req.params.id),
            email: req.session.email
        }).exec();
        categories = await Category.find({
            email: req.session.email
        }).exec();
    } catch {
        return res.redirect('/transactions')
    }

    // HTML Date format YYYY-MM-DD
    let date = `${format(transaction.date, 'yyyy')}-${format(transaction.date,'MM')}-${(parseInt(format(transaction.date,'d')) + 1).toString()}`
    let endDate;
    if (transaction.endDate != null) {
        endDate = `${format(transaction.endDate, 'yyyy')}-${format(transaction.endDate,'MM')}-${(parseInt(format(transaction.endDate,'d')) + 1).toString()}`
    }

    console.log(transaction)

    return res.render('transactions/edit', {
        transaction: transaction,
        categories: categories,
        date: date,
        endDate: endDate
    })
}

exports.postEdit = async (req, res) => {
    try {        
        await Transaction.updateOne({
            _id: mongodb.ObjectId(req.params.id),
            email: req.session.email
        }, {
            email: req.session.email,
            type: req.body.transactionType,
            categoryName: req.body.transactionCategory,
            date: req.body.transactionDate,
            amount: req.body.transactionAmount,
            note: req.body.transactionNote,
            recurring: req.body.transactionRecurring,
            recurringInterval: req.body.transactionRecurringInterval,
            endDate: req.body.transactionEndDate
        });        
    } catch {
        return res.redirect('/transactions');
    }

    res.redirect('/transactions');
}

exports.getDelete = async (req, res) => {
    try {
        var transaction = await Transaction.findOne({
            _id: new mongodb.ObjectId(req.params.id),
            email: req.session.email
        }).exec();
    } catch {
        return res.redirect('/transactions');
    }

    if(transaction == null) return res.redirect('/transactions');
    console.log(transaction);
    return res.render('transactions/delete', {
        transaction: transaction
    });
}

exports.postDelete = async (req, res) => {
    try{
        await Transaction.deleteOne({_id: new mongodb.ObjectId(req.params.id) ,email: req.session.email}).exec();
    } catch {
        return res.redirect('/transactions');
    }

    return res.redirect('/transactions');
}