const express = require("express");
const router = express.Router();
const validator = require('../middleware/validators/homeValidator');
const controller = require('../controllers/homeController');
const { sendDiscordMsg } = require('../middleware/discord');

const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authentication');

// Index route
router.route('/')
.get(checkAuthenticated,controller.getIndex);

// Home route
router.route('/home/:duration?/:offset?')
.get(checkAuthenticated, sendDiscordMsg ,controller.getHome);

// Login route
router.route('/login')
.get(checkNotAuthenticated, sendDiscordMsg, controller.getLogin)
.post(checkNotAuthenticated, sendDiscordMsg, validator.validateLogin, controller.postLogin);

// Register route
router.route('/register')
.get(checkNotAuthenticated, sendDiscordMsg, controller.getRegister)
.post(checkNotAuthenticated, sendDiscordMsg, validator.validateRegistration, controller.postRegister);

// Logout route
router.route('/logout')
.get(checkAuthenticated, sendDiscordMsg, controller.getLogout);

router.route('/demo')
.get(checkNotAuthenticated, sendDiscordMsg, controller.getDemo);

router.route('/about')
.get(sendDiscordMsg, controller.getAbout);

module.exports = router;