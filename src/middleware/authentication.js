const {
    format
} = require('url');

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

exports.checkNotAuthenticated = (req, res, next) => {
    if(!req.session.isLoggedIn) next();
    else  res.redirect('/home');
};