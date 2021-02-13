const Category = require('../Category');

exports.validateTransaction = async (req, res, next) => {
    let errors = []
    let categories;

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
    if(!type) errors.push('Must select Expense or Income');
    else if(type != 'expense' && type != 'income') errors.push('Problem with transaction type');

    if (categories.find(x => x.name == req.body.transactionCategory) == undefined) errors.push('Category not found');

    if (Number(req.body.transactionAmount) < 0) errors.push('Amount cannot be negative');
    else if (isNaN(req.body.transactionAmount)) errors.push('Amount must be a number');
    else if(req.body.transactionAmount === '') req.body.transactionAmount = 0;
    

    if (req.body.transactionRecurring) {
        let recurrance = req.body.transactionRecurringInterval;

        if (recurrance != 'weekly' && recurrance != 'biweekly' && recurrance != 'monthly')
            errors.push('Problem with Recurring Interval');

        if (Date.parse(req.body.transactionEndDate) < Date.now()) errors.push('End date must be in the future');        
    }
    else {
        req.body.transactionRecurring = false;
        req.body.transactionRecurringInterval = '';
        req.body.transactionEndDate = undefined;
    }

    if (errors.length == 0) return next();

    return res.render('transactions/add', {
        categories: categories,
        errors: errors
    })
};