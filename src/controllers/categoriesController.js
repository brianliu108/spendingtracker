const url = require('url'); // Do not delete
const {
    threadId
} = require('../database/dbConfig');
const {
    validateCategory
} = require('../models/validators/categoriesValidator');
const Category = require('../models/Category');
const connection = require('../database/dbConfig');

exports.getHome = (req, res) => {
    var categories = [];
    var pageData = {};
    
    res.render('categories/categories', pageData);
}

exports.getAdd = (req, res) => {
    res.render('categories/add');
}

exports.getEdit = (req, res) => {
    res.redirect(url.format({
        pathname: '/categories',
        query: {
            message: 'test'
        }
    }))
}

exports.postAdd = async (req, res) => {
    var errors = {};
    
    res.redirect(url.format({
        pathname: '/categories',
        query: {
            message: 'success'
        }
    }))
   
}