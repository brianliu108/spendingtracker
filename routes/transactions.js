const express = require("express");
const router = express.Router();

const {check, validationResult} = require('express-validator');

const connection = require('../dbConfig');

router.get('/', (req, res) =>{    
    //res.send("this works");    
    res.render('./transactions/transactions');
});  

router.get('/add', (req,res) => {
    res.render("./transactions/add");
});

module.exports = router;