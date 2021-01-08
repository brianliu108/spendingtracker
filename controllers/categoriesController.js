const {check, validationResult } = require('express-validator');
const url = require('url');

const connection = require('../dbConfig');

exports.getAll = (req, res, next) => {
    if(req.session.isLoggedIn) next();
    else{ //TODO: Switch out of this debug mode
        req.session.isLoggedIn = true; 
        req.session.userId = 5;        
        next();
    }
    // else res.redirect(url.format({
    //     pathname:'/login',
    //     query:{
    //         msg: true        
    //     }
    // }))
    ;
}

exports.getHome = (req, res) => {    
    var categories = [];    
    var pageData = {};
    connection.query(`SELECT category.name, type.name FROM \`category\` INNER JOIN type ON category.typeId = type.typeId`, (err, rows, fields) => {
        if (err) console.log(err);
        else {            
            for (var i = 0; i < rows.length; i++) {
                categories[i] = rows[i];
            }                            
        }
        pageData = {
            categories: categories
        }   
        console.log(categories);
        res.render('categories/categories', pageData);
    });        
}

exports.getAdd = (req, res) =>{    
    res.render('categories/add');
}

exports.postAdd = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty){
        console.log(errors.array());
    }

    const typeId = req.body.type;
    const categoryName = req.body.categoryName;

    res.send('fecal');
}