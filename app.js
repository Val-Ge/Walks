const express = require('express')
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./configs/passport-config');
const flash = require('connect-flash');
require('dotenv').config(); // Load environment variables from .env file

const port = 3000;
const app = express();

//import models
const Walk = require('./models/Walk');
const User = require('./models/User');

//import routes
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');
const otherBlogRoutes = require('./routes/otherBlogRoutes');

mongoose.connect('mongodb://localhost:27017/walksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: true}))

//express session setup
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

//connect flash setup
app.use(flash());

//global variables for flash essages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', userRoutes);
app.use('/', walkRoutes);
app.use('/', otherBlogRoutes);

app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
});