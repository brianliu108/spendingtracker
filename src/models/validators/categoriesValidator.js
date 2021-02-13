const connection = require('../../database/dbConfig');
const Category = require('../Category');

exports.validateCategory = async (req, res, next) => {
    let errors = [];
    let category;

    if (req.body.categoryName == '')
        errors.push('Name is required');
    else{
        try {
            category = await findCategory(req.session.email, req.body.categoryName);
        } catch {
            errors.push('Error finding the category');
        }
                
        if (category == null) return next();
        else errors.push('Category already exists');
    }

    if (errors.length > 0) return res.render('categories/add', {
        errors: errors
    });
}

// exports.validateDelete = async (req, res, next) => {
//     let errors = []

//     try{
//         let category = await findCategory(req.session.email, req.params.category);

//         if(category == null) return res.redirect('/categories');

//         next();
//     } catch {

//     }
// }

exports.validateEdit = async (req, res, next) => {
    let errors = [];
    let category;

    if(req.body.categoryName == '') errors.push('Name is required')
    
    if(errors.length > 0) return res.render('categories/edit', {
        errors: errors,
        category: {
            name: req.session.categoryEdit
        }
    });

    return next();

}

async function findCategory(email, name) {
    try{
        var category = await Category.findOne({email: email , name: name}).exec();
        if(category == null) return;

        else return category;
    } catch {
        throw new Error('Error finding category');
    }
}