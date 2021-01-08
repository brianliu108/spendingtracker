var connection = mysql.createPool({
    connectionLimit : 10,
    host: '',
    user: '',
    password: '',
    database: '',
    debug : false 
});

module.exports = connection;
