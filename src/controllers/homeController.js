require('express-session');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
    getDateRange,
    getStartAndEndDates
} = require('../utility/dateUtility');
const datefns = require('date-fns');

exports.getHome = async (req, res) => {
    let transactions, recurringTransactions, income = [],
        expenses = [],
        start, end,
        netIncome = 0,
        expenditure = 0;

    // Get duration from parameters or set to 'month'
    switch (typeof (req.params.duration)) {
        case 'day':
            req.session.duration = req.params.duration;
            break;
        case 'week':
            req.session.duration = req.params.duration;
            break;
        case 'year':
            req.session.duration = req.params.duration;
            break;
        default:
            req.session.duration = 'month'
            break;
    }
    // Get offset parameter or set to 0
    switch (typeof (req.params.offset)) {
        case 'string':
            req.session.offset = parseInt(req.params.offset)
            if (isNaN(req.session.offset)) req.session.offset = 0;
            break;
        default:
            req.session.offset = 0;
            break;
    }
    req.session.dateRange = getDateRange(req.session.duration, req.session.offset);
    [start, end] = getStartAndEndDates(req.session.duration, req.session.offset);
    // console.log(start, end);

    try {
        transactions = await Transaction.find({
            email: req.session.email,
            date: {
                $gte: start,
                $lte: end
            },
            recurring: false
        }).sort({
            date: 1
        }).exec();

        recurringTransactions = await Transaction.find({
            email: req.session.email,
            recurring: true
        }).exec();
    } catch {
        return res.redirect('/');
    }

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type == 'income') {
            income.push(transactions[i]);
            netIncome = netIncome + transactions[i].amount;
        } else {
            expenses.push(transactions[i]);
            expenditure = expenditure + transactions[i].amount;
        }
    }

    for (let i = 0; i < recurringTransactions.length; i++) {
        const transaction = recurringTransactions[i];

        if (!datefns.isBefore(end, transaction.date)) {
            if (transaction.endDate != null) {
                if (datefns.isBefore(transaction.endDate, end)) {
                    if (transaction.recurringInterval === 'monthly') {
                        if (!datefns.isSameMonth(transaction.endDate, end)) {
                            continue;
                        }
                    } else if (transaction.recurringInterval === 'biweekly') {
                        if (!(datefns.isBefore(transaction.endDate, start) && datefns.isAfter(transaction.endDate, end))) {
                            continue;
                        }
                    } else if (transaction.recurringInterval === 'weekly') {
                        if (!datefns.isSameWeek(transaction.endDate, end)) {
                            continue;
                        }
                    }
                }
            }

            if (transaction.type == 'income') {                
                income.push(transaction);
                netIncome = netIncome + transaction.amount;
            } else {
                expenses.push(transaction);
                expenditure = expenditure + transaction.amount;
            }
            // validRecurringTransactions.push(transaction);
        }
    }

    let categories = []

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        let category = categories.find(x => x.category == expense.categoryName);

        if (category == undefined) {
            categories.push({
                category: expense.categoryName,
                amount: expense.amount
            });
        } else {
            let updateIndex = categories.indexOf(categories.find(x => x.category == expense.categoryName));
            categories[updateIndex].amount += expense.amount;
        }
    }

    categories.sort((a, b) => {
        return b.amount - a.amount
    });

    // console.log(categories);

    res.render('home', {
        dateRange: req.session.dateRange,
        duration: req.session.duration,
        offset: req.session.offset,
        netIncome: netIncome,
        expenditure: expenditure,
        income: income,
        expenses: categories
    });
}

exports.getIndex = (req, res) => {
    res.redirect('/login');
}

exports.getDemo = (req, res) => {
    req.session.email = 'demo@demo.com';
    req.session.isLoggedIn = true;

    res.redirect('/home');
}

exports.getLogin = (req, res) => {
    let pageData = {}
    Object.assign(pageData, {
        showLogout: false
    })

    res.render('login', pageData);
}

exports.postLogin = (req, res) => {
    res.redirect('home');
};

exports.getRegister = (req, res) => {
    res.render('register', {
        showLogout: false
    });
};

exports.postRegister = async (req, res) => {
    try {
        const user = new User(req.body);
        console.log(user);
        user.password = await bcrypt.hash(req.body.password, 8);
        await user.save();
        req.session.isLoggedIn = true;
        req.session.email = req.body.email;
    } catch (e) {
        console.log(e);
        return res.render('register', {
            errors: ['Problem creating an account'],
            formFields: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }


    res.redirect('/home');
};

exports.getLogout = (req, res) => {
    req.session.isLoggedIn = false;

    res.redirect('/login');
}