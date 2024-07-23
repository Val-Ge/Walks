import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './configs/passport-config';
import flash from 'connect-flash';
import('dotenv').config(); // Load environment variables from .env file

const port = 3000;
const app = express();

//import models
import Walk from './models/Walk.js';
import User from './models/User.js';

//import routes
import userRoutes from './routes/userRoutes.js';
import walkRoutes from './routes/walkRoutes.js';
import otherBlogRoutes from './routes/otherBlogRoutes.js';

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