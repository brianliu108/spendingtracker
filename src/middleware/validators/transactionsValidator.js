const Category = require('../../models/Category');
const validator = require('validator');
const Transaction = require('../../models/Transaction');
const mongodb = require('mongodb');
const {
    format,
    isBefore
} = require('date-fns');

exports.validateTransaction = async (req, res, next) => {
    let errors = [],
        categories = [],
        transaction, endDate;
    console
    
    if (req.session.isEditing) {
        // See if transaction record exists
        try {
            transaction = await Transaction.findOne({
                _id: new mongodb.ObjectId(req.params.id),
                email: req.session.email
            }).exec();
        } catch {
            return res.redirect('/transactions');
        }

        // HTML Date format YYYY-MM-DD
        date = `${format(transaction.date, 'yyyy')}-${format(transaction.date,'MM')}-${(parseInt(format(transaction.date,'d')) + 1).toString()}`

        if (transaction.endDate != null) {
            endDate = `${format(transaction.endDate, 'yyyy')}-${format(transaction.endDate,'MM')}-${(parseInt(format(transaction.endDate,'d')) + 1).toString()}`
        }
    }

    // Find categories
    try {
        categories = await Category.find({
            email: req.session.email
        }).sort({
            name: 1
        }).exec();
    } catch {
        errors.push('Problem loading. Please try again');
    }

    let type = req.body.transactionType;

    // Check Type
    if (!type) errors.push('Must select Expense or Income');
    else if (type != 'expense' && type != 'income') errors.push('Problem with transaction type');

    // Check if inputted category exists
    // console.log(categories.find(x => x.name == req.body.transactionCategory));
    if (categories.find(x => x.name == req.body.transactionCategory) == undefined) errors.push('Category not found');

    // Validate Date
    if (!validator.isDate(req.body.transactionDate)) errors.push('Problem with date');

    // Validate Amount
    if (Number(req.body.transactionAmount) < 0) errors.push('Amount cannot be negative');
    else if (isNaN(req.body.transactionAmount)) errors.push('Amount must be a number');
    else if (req.body.transactionAmount === '') req.body.transactionAmount = 0;

    // Validate Recurring
    if (req.body.transactionRecurring) {
        let recurrance = req.body.transactionRecurringInterval;

        if (recurrance != 'weekly' && recurrance != 'biweekly' && recurrance != 'monthly') {
            errors.push('Problem with Recurring Interval');
        }

        // end date
        let endDate = req.body.transactionEndDate;

        if (!validator.isDate(endDate) && endDate != '') errors.push('Problem with end date');
        else if (Date.parse(endDate) < Date.now()) errors.push('End date must be in the future');
    } else {
        req.body.transactionRecurring = false;
        req.body.transactionRecurringInterval = null;
        req.body.transactionEndDate = null;
    }

    
    if (errors.length == 0) return next();

    console.log(transaction);

    if(req.session.isEditing) {
        req.session.isEditing = false;
        return res.render('transactions/edit', {
            transaction: transaction,
            categories: categories,
            endDate: endDate,
            errors: errors
        });
    }
    else {
        return res.render('transactions/add', {
            errors: errors,
            categories: categories
        })
    }
    

};