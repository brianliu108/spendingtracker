const express = require("express");
const router = express.Router();
const validator = require('../middleware/validators/categoriesValidator');
const controller = require('../controllers/categoriesController');
const { checkAuthenticated } = require('../middleware/authentication');

router.route('/categories')
.get(checkAuthenticated, controller.getCategories);

router.route('/categories/add')
.get(checkAuthenticated, controller.getAdd)
.post(checkAuthenticated, validator.validateCategory , controller.postAdd);

router.route('/categories/delete/:category')
.get(checkAuthenticated, controller.getDelete)
.post(checkAuthenticated, controller.postDelete)

router.route('/categories/edit/:category')
.get(checkAuthenticated, controller.getEdit)
.post(checkAuthenticated, validator.validateEdit, controller.postEdit);

module.exports = router;