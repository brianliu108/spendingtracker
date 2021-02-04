const {format} = require('url');

exports.getAll = (req, res, next) => {
    if(req.session.isLoggedIn) next();
    else{ //TODO: Switch out of this debug mode
        req.session.isLoggedIn = true; 
        req.session.userId = 5;        
        next();
    }
    // else res.redirect(format({
    //     pathname:'/login',
    //     query:{
    //         msg: true        
    //     }
    // }));
    
}