const { validationResult } = require('express-validator');
const url = require('url'); // Do not delete
const { threadId } = require('../dbConfig');

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
    connection.query(`SELECT category.categoryId, category.userId AS 'categoryUserId', category.name AS 'categoryName', type.name as 'typeName' 
    FROM type INNER JOIN category ON type.typeId = category.typeId
    WHERE category.userId = ${req.session.userId}
    ORDER BY type.name DESC, category.name ASC`, (err, rows, fields) => {
        if (err) console.log(err);
        else {            
            for (var i = 0; i < rows.length; i++) {
                categories[i] = rows[i];
            }                            
        }
        pageData.categories = categories;                     
        if(typeof(req.query.message) != 'undefined') pageData.message = req.query.message;
        
        res.render('categories/categories', pageData);
    });        
}

exports.getAdd = (req, res) =>{    
    res.render('categories/add');
}

exports.getEdit = (req,res) => {
    res.redirect(url.format({
            pathname:'/categories',
            query:{
                message: 'Fecaltest'        
            }
        }))
}

exports.postAdd = (req,res) => {
    console.log('postadd executed');
    const errors = validationResult(req);             
    if(!errors.isEmpty()){
        console.log(errors);
        res.render('categories/add', {errors: errors.array()});
    }
    else {
        connection.query(`INSERT INTO category(typeId, userId, name)
        VALUES (${req.body.type}, ${req.session.userId}, '${req.body.categoryName}')`, (err, rows, fields) => {            
            if (err) res.render('categories/categories', {message: 'Error creating new category'});
            else if(rows.length === 0) throw new Error('empty');
            else res.redirect(url.format({
                    pathname:'/categories',
                    query:{
                        message: 'success'        
                    }
                }))
        });
        
    }

    
}