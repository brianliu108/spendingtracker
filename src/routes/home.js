const express = require("express");
const router = express.Router();
const validator = require('../models/validators/homeValidator');
const controller = require('../controllers/homeController');

const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authentication');

// Index route
router.route('/')
.get(controller.getIndex);

// Home route
router.route('/home')
.get(checkAuthenticated, controller.getHome);

// Login route
router.route('/login')
.get(checkNotAuthenticated, controller.getLogin)
.post(checkNotAuthenticated, validator.validateLogin ,controller.postLogin);

router.route('/register')
.get(checkNotAuthenticated, controller.getRegister)
.post(checkNotAuthenticated, validator.validateRegistration, controller.postRegister);

// Logout route
router.route('/logout')
.get(checkAuthenticated, controller.getLogout);



module.exports = router;