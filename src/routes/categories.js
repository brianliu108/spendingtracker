const express = require("express");
const router = express.Router();
const validator = require('../models/validators/categoriesValidator');
const controller = require('../controllers/categoriesController');
const { checkAuthenticated } = require('../middleware/authentication');

const connection = require('../database/dbConfig');

// router.route('*')
// .get(authentication.getAll);

router.route('/categories')
.get(checkAuthenticated, controller.getHome);

router.route('/categories/add')
.get(checkAuthenticated, controller.getAdd)
.post(checkAuthenticated, controller.postAdd);


// router.post('/add',validator.validateCategory,controller.postAdd);

// router.route('/Edit/:id')
// .get(controller.getEdit);

module.exports = router;