# Spending Tracker
# By Brian Liu

In order to protect sensitive information, `dbConfig.js` is not included.
The path for `dbConfig.js` is `src/database/dbConfig.js`
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
