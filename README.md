# Spending Tracker
# By Brian Liu

In order to protect sensitive information, `dbConfig.js` is in the .gitignore file. 
My template for it is as follows:

```const mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    host: '',
    user: '',
    password: '',
    database: '',
    debug : false 
});

module.exports = connection;
