const url = require('url'); // Do not delete
const { validateCategory } = require('../middleware/validators/categoriesValidator');
const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    var categories = await Category.find({ email: req.session.email }).sort({ name: 1 }).exec();
    
    res.render('categories/categories',{
        categories: categories
    });
};

exports.getAdd = (req, res) => { 
    res.render('categories/add');
};

exports.postAdd = async (req, res) => {
    try{        
        var category = new Category({
            email: req.session.email,
            name: req.body.categoryName
        });        

        await category.save();

        if(req.params.type == 'i') {
            return res.redirect(`/transactions/add/i/${req.body.categoryName}`);
        }
        else if(req.params.type == 'e') {
            return res.redirect(`/transactions/add/e/${req.body.categoryName}`);
        }

        return res.redirect('/categories');
    } catch (e) {        
        return res.render('categories/add', {
            errors: ['Error adding. Please try again']
        })
    }
    
};

exports.getDelete = async (req, res) => {
    try{
        var category = await Category.findOne({
            email: req.session.email,
            name: req.params.category
        }).exec();        
    } catch {
        return res.redirect('/categories');
    }
    
    if(category == null) return res.redirect('/categories');

    req.session.categoryDelete = category.name;    
    return res.render('categories/delete', {
        category: category
    });
};

exports.postDelete = async (req, res) => {
    try{
        await Category.deleteOne({email: req.session.email, name: req.session.categoryDelete}).exec();
    } catch {
        return res.redirect('/categories');
    }

    return res.redirect('/categories');
}

exports.getEdit = async (req, res) => {
    let category;
    
    try{
        category = await Category.findOne({
            email: req.session.email,
            name: req.params.category
        }).exec();        
    } catch {
        return res.redirect('/categories');
    }
    
    if(category == null) return res.redirect('/categories');

    req.session.categoryEdit = req.params.category;      
    return res.render('categories/edit', {
        category: category
    });
}

exports.postEdit = async (req, res) => {
    try{
        await Category.updateOne({email: req.session.email, name: req.session.categoryEdit},{email: req.session.email, name: req.body.categoryName});
    } catch {
        return res.redirect('/categories');
    }

    res.redirect('/categories');
}
