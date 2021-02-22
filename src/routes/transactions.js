const express = require("express");
const router = express.Router();
const controller = require('../controllers/transactionsController');
const {
    checkAuthenticated
} = require('../middleware/authentication');
const validator = require('../middleware/validators/transactionsValidator');
const {
    signifyEdit
} = require('../middleware/edit');

router.route('/transactions')
    .get(checkAuthenticated, controller.getTransactions);

router.route('/transactions/add/:type?/:category?')
    .get(checkAuthenticated, controller.getAdd)
    .post(checkAuthenticated, validator.validateTransaction, controller.postAdd);

router.route('/transactions/edit/:id')
    .get(checkAuthenticated, controller.getEdit)
    .post(checkAuthenticated, signifyEdit, validator.validateTransaction, controller.postEdit);

router.route('/transactions/delete/:id')
    .get(checkAuthenticated, controller.getDelete)
    .post(checkAuthenticated, controller.postDelete);

module.exports = router;