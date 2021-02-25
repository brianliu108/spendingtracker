const express = require("express");
const router = express.Router();
const { sendDiscordMsg } = require('../middleware/discord');

router.all("*", sendDiscordMsg ,(req, res) => {
    res.render('404');
})

module.exports = router;