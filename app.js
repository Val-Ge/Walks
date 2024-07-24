import dotenv from 'dotenv';
dotenv.config(); // Call the config method to load environment variables

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import './configs/passport-config.js';

//import routes and models
import Walk from './models/Walk.js';
import User from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import walkRoutes from './routes/walkRoutes.js';
import otherBlogRoutes from './routes/otherBlogRoutes.js';

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/walksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.json()); //Parses incoming JSON requests.
app.use(express.urlencoded( { extended: true})) // Parses incoming URL-encoded requests (from forms).

//express session setup
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

//connect flash setup
app.use(flash());

//Flash middleware: Makes flash messages available to all views by attaching them to res.locals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Passport: Initializes Passport for handling authentication and manages session-based authentication.
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', userRoutes);
app.use('/', walkRoutes);
app.use('/', otherBlogRoutes);

app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
});