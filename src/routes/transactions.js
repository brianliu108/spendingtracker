const express = require("express");
const router = express.Router();

const connection = require('../database/dbConfig');

router.route('/transactions')
.get((req, res) =>{    
       
    res.render('./transactions/transactions');
});

router.route('/transactions/add')
.get((req,res) => {
    res.render("./transactions/add");
});


module.exports = router;