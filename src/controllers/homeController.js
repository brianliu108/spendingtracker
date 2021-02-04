const {check, validationResult} = require('express-validator');

const connection = require('../database/dbConfig');

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
    res.cookie('showLogout', false);
    if(!req.session.isLoggedIn){
        var pageData = {};
        if(req.query.msg) pageData = {tempMessage:'Please login first!'};
        
        Object.assign(pageData, {showLogout: false})
        console.log(pageData);
        res.render('login',pageData);
    }
    else{
        res.redirect('/home')
    }
}

exports.getLogout = (req, res) => {
    req.session.isLoggedIn = false;

    res.redirect('/login');
}

exports.postLogin = (req,res) => {
    const errors = validationResult(req);    
    
    if(errors.isEmpty()){        
        connection.query(`SELECT * FROM \`user\` WHERE \`email\` = '${req.body.username}'` , (err, rows, fields) => {            
            if (err) res.render('login', {errorMsg: 'Something went wrong. Please try again'});
            else if(rows.length === 0) {            
                res.render('login', {errorMsg: `User '${req.body.username}' not found!`});
            }
            else {                                
                req.session.isLoggedIn = true; 
                req.session.userId = rows[0].userId;
                                
                res.redirect('/home');
            }                                           
        });
    }
    else res.render('login', {errorMsg: 'Username is required'});    
};




