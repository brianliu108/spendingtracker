const connection = require('../../dbConfig');

exports.validateCategory = (typeValue, categoryNameValue) => {
    let errors = {};

    if (!(typeValue == 1 || typeValue == 2)) errors.type = 'Type wasn\'t found';    
    if (categoryNameValue == '') errors.categoryName = 'Name is required';

    console.log('validateCategory finished');
    return errors;
}