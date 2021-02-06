require('express-session');
const connection = require('../database/dbConfig');
const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.getHome = (req, res) =>{    
    if(!req.session.isLoggedIn){
        res.redirect('/login');
    }
    else{
        res.render('home');
    }
}

exports.getIndex = (req, res) => {
    res.redirect('/login');
}

exports.getLogin = (req,res) => {        
    if(!req.session.isLoggedIn){        
        var pageData = {};
        if(req.query.msg) pageData = {tempMessage:'Please login first!'};
        
        Object.assign(pageData, {showLogout: false})        
        
        res.render('login',pageData);
    }
    else{
        res.redirect('/home')
    }
}

exports.postLogin = (req,res) => {
    res.send('login posted');
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






