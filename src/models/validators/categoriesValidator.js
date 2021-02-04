const connection = require('../../database/dbConfig');

exports.validateCategory = async (typeValue, categoryNameValue) => {
    let errors;
    const income = 1;
    const expense = 2;
    var rows = [];

    if (!(typeValue == income || typeValue == expense)) errors.type = 'Type wasn\'t found';
    if (categoryNameValue == '') errors.categoryName = 'Name is required';

    // connection.query(
    //     `SELECT * FROM type WHERE typeId = ?`,
    //     [connection.escape(typeValue)],
    //     (error, results, fields) => {
    //         errors = results;
    //     });

    // console.log('validateCategory finished');
    return errors;
}