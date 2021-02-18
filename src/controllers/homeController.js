require('express-session');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const datefns = require('date-fns');

exports.getHome = async (req, res) =>{   
    let transactions, duration, offset;

    // Get duration from parameters or set to 'month'
    switch (typeof(req.params.duration)) {
        case 'number':
            duration = req.params.duration;
            break;   
        default:
            duration = 'month'
            break;
    }
    // Get offset parameter or set to 0
    switch (typeof(req.params.offset)) {
        case 'number':
            offset = parseInt(req.params.offset)
            break;  
        default:
            offset = 0;
            break;
    }

    try {
        transactions = await Transaction.find({email: req.session.email})
    } catch {
        res.redirect('/');
    }
    console.log(transactions);
    res.render('home', {
        date: dayjs().format('MMMM')
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

exports.getLogin = (req,res) => {   
    if(!req.session.isLoggedIn){        
        var pageData = {};
        if(req.query.msg) pageData = {tempMessage:'Please login first'};
        
        Object.assign(pageData, {showLogout: false})        
        
        res.render('login', pageData);
    }
    else{
        res.redirect('/home')
    }
}

exports.postLogin = (req,res) => {
    res.redirect('home');
};

exports.getRegister = (req, res) => {
    res.render('register', {showLogout: false});
};

exports.postRegister = async (req,res) => {
    try{        
        const user = new User(req.body);
        console.log(user);
        user.password = await bcrypt.hash(req.body.password, 8);
        await user.save();
    }
    catch (e) {        
        return res.render('/register', {
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