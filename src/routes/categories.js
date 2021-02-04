const express = require("express");
const router = express.Router();
const validator = require('../models/validators/categoriesValidator');
const controller = require('../controllers/categoriesController');
const commonController = require('../controllers/commonController');

const connection = require('../database/dbConfig');

router.route('*')
.get(commonController.getAll);

router.route('/categories')
.get(controller.getHome);

router.route('/categories/add')
.get(controller.getAdd)
.post(controller.postAdd);


// router.post('/add',validator.validateCategory,controller.postAdd);

router.route('/Edit/:id')
.get(controller.getEdit);

module.exports = router;