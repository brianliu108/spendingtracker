const {check, validationResult} = require('express-validator');
const connection = require('../dbConfig');
const Joi = require('joi');

// const schema = Joi.object().keys({
//     type: Joi.number().trim().required(),
//     categoryName: Joi.string().trim().required()
// });

exports.validateCategory = [    
    check('type').custom(typeValidation),
    check('categoryName').trim().custom(categoryNameValidation)
];

function typeValidation(value){  
    // console.log('Validation executed')  ;
    if(value == 1 || value == 2) return true
    else throw new Error('Type wasn\'t found');        
    // connection.query(`SELECT * FROM type WHERE typeId = ${value}`,(err, rows) => {          
    //     console.log('typeValidation executed');
    //     if (err) throw new Error('Something went wrong, please try again');
    //     else if(rows.length == 0) throw new Error('Type wasn\'t found');
    //     else return true;                                                             
    // }); 
}

function categoryNameValidation(value){   
    console.log('categoryName executed')  
    if(value === ''){        
        throw new Error('Name is required');    
    }
    else return true;
}
