/**
 *  Created By: Brian Liu
 *  Spending Tracker App
 **/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const {format} = require('url');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'very much a secret key',
    resave: false,
    saveUninitialized: false
}));

// Configure views engine & directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use('*', (req, res, next) => {
//     console.log('executed ' + req.session.isLoggedIn);
//     if(!req.session.isLoggedIn) res.redirect(format({
//         pathname:'/login',
//         query:{
//             msg: true        
//         }
//     })); else next;
// });


// Setup routes
app.use('/', require('./routes/home'));
app.use('/categories', require('./routes/categories'));
app.use('/transactions', require('./routes/transactions'));
//app.use('/types', require('./routes/types'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));