const connection = require('../../database/dbConfig');

exports.validateCategory = async (typeValue, categoryNameValue) => {
    let errors;
    // const income = 1;
    // const expense = 2;
    // var rows = [];

    // if (!(typeValue == income || typeValue == expense)) errors.type = 'Type wasn\'t found';
    // if (categoryNameValue == '') errors.categoryName = 'Name is required';    

    let resultRows = Array();
    const result = connection.query(`SELECT * FROM type WHERE typeId = ?`, [connection.escape(typeValue)],
    async (err, rows, fields) => {
        async.each(rows, function (row, callback) {
            connection.query('SELECT * FROM TABLE 2', function (err, innerRow) {
                resultRows.push(innerRow);
                callback(null);
            });
        }, async function () {
            //This is the final function which get executed when loop is done.
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
                },
                body: JSON.stringify({
                    success: true,
                    data: resultRows
                })
            };
            callback(null, response);
        });
    });

    // var query = connection.query(`SELECT * FROM type WHERE typeId = ?`,
    //     [connection.escape(typeValue)],
    //     (error, results, fields) => {
    //         if (error) errors = error;
    //         else {
    //             errors = results;
    //         }
    //         console.log('escaped: ', connection.escape(typeValue));
    //         console.log('validateCategory query executed');
    //     });

    // // console.log('validateCategory finished');
    // console.log('query:', query);
    // return errors;
}