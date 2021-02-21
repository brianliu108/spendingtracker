const validator = require('validator');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.validateLogin = async (req,res,next) => {
    var errors = [];
    var user;

    // Validate Email
    if(!validator.isEmail(req.body.email)){
        errors.push('Email is invalid');
        return res.render('login', {
            showLogout: false,
            errors: errors
        });
    }
    
    // Find User
    user = await User.findOne({email: req.body.email}).exec();
    if(user == null){
        errors.push('User doesn\'t exist');
        return res.render('login', {
            showLogout: false,
            errors: errors
        });
    }
    
    try{
        await bcrypt.compare(req.body.password, user.password, (err,result) => {
            if(!result){
                errors.push('Incorrect password');
                return res.render('login', {
                    showLogout: false,
                    errors: errors
                });
            } 
            else {
                // Login Valid
                req.session.email = user.email;
                req.session.isLoggedIn = true;
                return next();
            }
        });
    } catch (e) {
        errors.push('Problem logging in. Try again');
        return res.render('login', {
            showLogout: false,
            errors: errors
        });
    } 
};

exports.validateRegistration = async (req,res,next) => {
    var errors = [];
    var pageData = {};

    // Validate inputs
    if(!validator.isEmail(req.body.email)) errors.push('Email is invalid');
    if(!validator.isLength(req.body.password,{
        min: 5,
        max: 16
    })) errors.push('Password should be 5-16 characters');
    pageData.errors = errors;
    pageData.formFields = {
        name: req.body.name,
                email: req.body.email
    }
    if(errors.length == 0){
        var user = await User.findOne({email: req.body.email}).exec();
        
        if(user != null) return res.render('register', {
            errors: ['Email already taken'],
            formFields: {
                name: req.body.name,
                email: req.body.email
            },
            showLogout: false
        })
        else return next();
    }
    
    else return res.render('register',pageData);
};
