# Spending Tracker
# By Brian Liu

`dbConfig.js` is in the .gitignore file, so my template for it is as follows:

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
