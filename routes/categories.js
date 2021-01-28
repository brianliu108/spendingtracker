const express = require("express");
const router = express.Router();
const validator = require('../validators/categoriesValidator');
const controller = require('../controllers/categoriesController');
const commonController = require('../controllers/commonController');

const connection = require('../dbConfig');

router.route('*')
.get(commonController.getAll);

router.route('/')
.get(controller.getHome);

router.route('/add')
.get(controller.getAdd)
.post(controller.postAdd);


// router.post('/add',validator.validateCategory,controller.postAdd);

router.route('/Edit/:id')
.get(controller.getEdit);

module.exports = router;