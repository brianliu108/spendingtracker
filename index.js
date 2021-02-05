/**
 *  Created By: Brian Liu
 *  Spending Tracker App
 **/
require('dotenv').config();
require('./src/database/dbConfig');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('./src/models/User')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
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

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));