const {check, validationResult} = require('express-validator');

exports.validateLogin = [
    check('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
];