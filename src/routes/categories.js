const express = require("express");
const router = express.Router();
const validator = require('../middleware/validators/categoriesValidator');
const controller = require('../controllers/categoriesController');
const { checkAuthenticated } = require('../middleware/authentication');
const { sendDiscordMsg } = require('../middleware/discord');

router.route('/categories')
.get(checkAuthenticated , sendDiscordMsg,controller.getCategories);

router.route('/categories/add/:type?')
.get(checkAuthenticated, sendDiscordMsg, controller.getAdd)
.post(checkAuthenticated, validator.validateCategory , sendDiscordMsg, controller.postAdd);

router.route('/categories/delete/:category')
.get(checkAuthenticated, sendDiscordMsg, controller.getDelete)
.post(checkAuthenticated, sendDiscordMsg, controller.postDelete)

router.route('/categories/edit/:category')
.get(checkAuthenticated, sendDiscordMsg, controller.getEdit)
.post(checkAuthenticated, validator.validateEdit, sendDiscordMsg, controller.postEdit);

module.exports = router;