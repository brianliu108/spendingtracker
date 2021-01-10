const express = require("express");
const router = express.Router();
const validator = require('../validators/categoriesValidator');
const controller = require('../controllers/categoriesController');

const connection = require('../dbConfig');

router.route('*')
.get(controller.getAll);

router.route('/')
.get(controller.getHome);

router.route('/add')
.get(controller.getAdd)
.post(validator.validateCategory, controller.postAdd);
// .post(controller.postAdd, validator.validateCategory);

// router.post('/add',validator.validateCategory,controller.postAdd);

router.route('/Edit/:id')
.get(controller.getEdit);

module.exports = router;