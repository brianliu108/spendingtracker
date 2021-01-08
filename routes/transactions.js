const express = require("express");
const router = express.Router();

const {check, validationResult} = require('express-validator');

const connection = require('../dbConfig');

router.route('/')
.get((req, res) =>{    
       
    res.render('./transactions/transactions');
});

router.route('/add')
.get((req,res) => {
    res.render("./transactions/add");
});


module.exports = router;