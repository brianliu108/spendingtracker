const {check, validationResult} = require('express-validator');

exports.validateCategory = [
    
    check('categoryName', 'Name is required').notEmpty
];