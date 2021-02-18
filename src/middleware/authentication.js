const {
    format
} = require('url');

// TODO: Authentication!
exports.checkAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else res.redirect(format({
        pathname: '/login',
        query: {
            msg: true
        }
    }));
}

// TODO UNCOMMENT THIS FOR DEPLOYMENT
exports.checkNotAuthenticated = (req, res, next) => {
    if(!req.session.isLoggedIn) next();
    else  res.redirect('/home');
};

// TODO DO NOT DEPLOY THIS CODE
// var User = require('../models/User');
// exports.checkNotAuthenticated = async (req, res, next) => {
//     req.session.isLoggedIn = true;
//     var user = await User.findOne({ email: 'demo@demo.com' }).exec();
//     req.session.email = user.email;
//     req.session.userId = user._id;    
//     next();
// };