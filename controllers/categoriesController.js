const {
    validationResult
} = require('express-validator');
const url = require('url'); // Do not delete
const {
    threadId
} = require('../dbConfig');
const {
    validateCategory
} = require('../validators/categoriesValidator');

const connection = require('../dbConfig');

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
        if (typeof (req.query.message) != 'undefined') pageData.message = req.query.message;

        res.render('categories/categories', pageData);
    });
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

exports.postAdd = (req, res) => {
    // Do validations
    let errors = validateCategory(req.body.type, req.body.categoryName);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {

        connection.query(`INSERT INTO category(typeId, userId, name)
        VALUES (${(req.body.type)}, ${(req.session.userId)}, '${(req.body.categoryName)}')`,
            (err, rows, fields) => {
                if (err) res.redirect(url.format({
                    pathname: '/categories',
                    query: {
                        message: 'Error adding category'
                    }
                }));
                else if (rows.length === 0) throw new Error('empty');
                else {
                    res.redirect(url.format({
                        pathname: '/categories',
                        query: {
                            message: 'success'
                        }
                    }))
                }
            });
    } else res.render('categories/add', {
        errors: errors
    });
}