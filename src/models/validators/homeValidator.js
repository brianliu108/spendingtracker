const { render } = require('ejs');
const validator = require('validator');
const User = require('../../models/User');

exports.validateRegistration = async (req,res,next) => {
    var errors = [];
    var pageData = {};
    if(!validator.isEmail(req.body.email)) errors.push('Email is invalid');
    if(!validator.isLength(req.body.password,{
        min: 5,
        max: 16
    })) errors.push('Password should be 5-16 characters');
    pageData.errors = errors;
    if(errors.length == 0){
        var user = await User.findOne({email: req.body.email}).exec();
        
        if(user != null) return res.render('register', {
            errors: ['Email already taken']
        })
        else return next();
    }
    else res.render('register',pageData);
};
