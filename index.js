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

// Setup routes
app.use(require('./src/routes/home'));
app.use(require('./src/routes/categories'));
app.use(require('./src/routes/transactions'));
//app.use('/types', require('./routes/types'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));