const express = require("express");
const router = express.Router();
const validator = require('../validators/homeValidator');
const controller = require('../controllers/homeController');

// Index route
router.route('/')
.get(controller.getIndex);

// Login route
router.route('/login')
.get(controller.getLogin)
.post(validator.validateLogin , controller.postLogin);

// Logout route
router.route('/logout')
.get(controller.getLogout);

// Home route
router.route('/home')
.get(controller.getHome);

module.exports = router;