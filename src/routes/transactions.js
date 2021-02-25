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
const { sendDiscordMsg } = require('../middleware/discord');

router.route('/transactions')
    .get(checkAuthenticated, sendDiscordMsg, controller.getTransactions);

router.route('/transactions/add/:type?/:category?')
    .get(checkAuthenticated, sendDiscordMsg, controller.getAdd)
    .post(checkAuthenticated, validator.validateTransaction, sendDiscordMsg, controller.postAdd);

router.route('/transactions/edit/:id')
    .get(checkAuthenticated, controller.getEdit)
    .post(checkAuthenticated, signifyEdit, validator.validateTransaction, sendDiscordMsg, controller.postEdit);

router.route('/transactions/delete/:id')
    .get(checkAuthenticated, sendDiscordMsg, controller.getDelete)
    .post(checkAuthenticated, sendDiscordMsg, controller.postDelete);

module.exports = router;