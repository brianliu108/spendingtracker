const express = require("express");
const router = express.Router();
const validator = require('../validators/categoriesValidator');
const controller = require('../controllers/categoriesController');

const {check, validationResult} = require('express-validator');

const connection = require('../dbConfig');

// TODO: Uncomment to reimplement login check
router.route('*')
.get(controller.getAll);

router.route('/')
.get(controller.getHome);

router.route('/add')
.get(controller.getAdd)
.post(validator.validateCategory,
controller.postAdd);

module.exports = router;