const express = require("express");
const router = express.Router();
const controller = require('../controllers/transactionsController');
const { checkAuthenticated, checkNotAuthenticated} = require('../middleware/authentication');
const validator = require('../models/validators/transactionsValidator');

router.route('/transactions')
.get(checkAuthenticated, controller.getTransactions);

router.route('/transactions/add')
.get(checkAuthenticated, controller.getAdd)
.post(checkAuthenticated, validator.validateTransaction,controller.postAdd);

module.exports = router;