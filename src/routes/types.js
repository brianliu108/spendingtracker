// NOT USED

const express = require("express");
const router = express.Router();

const connection = require('../dbConfig');

router.get('/', (req,res) => {
    var types = [];
    connection.query('SELECT * FROM `type`', (err, rows, fields) => {
        if (err) console.log(err);
        else {            
            for (var i = 0; i < rows.length; i++) {
                types.push(rows[i]);
            }                            
        }
        var pageData = {
            types: types
        }          
        res.render('./types/types', pageData);
    });        
});

router.get('/Add', (req, res) => {
    res.render('./types/add');
});

module.exports = router;