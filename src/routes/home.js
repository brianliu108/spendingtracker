const express = require("express");
const router = express.Router();
const validator = require('../middleware/validators/homeValidator');
const controller = require('../controllers/homeController');

const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authentication');

// Index route
router.route('/')
.get(checkAuthenticated,controller.getIndex);

// Home route
router.route('/home/:duration?/:offset?')
.get(checkAuthenticated, controller.getHome);

// Login route
router.route('/login')
.get(checkNotAuthenticated, controller.getLogin)
.post(checkNotAuthenticated, validator.validateLogin, controller.postLogin);

// Register route
router.route('/register')
.get(checkNotAuthenticated, controller.getRegister)
.post(checkNotAuthenticated, validator.validateRegistration, controller.postRegister);

// Logout route
router.route('/logout')
.get(checkAuthenticated, controller.getLogout);

router.route('/demo')
.get(checkNotAuthenticated, controller.getDemo);

module.exports = router;