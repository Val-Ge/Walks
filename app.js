// import environment variables
import dotenv from 'dotenv';
dotenv.config(); //load env variables from .env file

//import modules
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import './configs/passport-config.js';

import { authMiddleware } from './middleware/authMiddleware.js';

// import configurations
import './configs/passport-config.js'; // Passport configuration

//import routes 
import newWalkRouter from './routes/newWalk.js';
import userRoutes from './routes/userRoutes.js';
import walkRoutes from './routes/walkRoutes.js';
import otherBlogRoutes from './routes/otherBlogRoutes.js';

// import models
import Walk from './models/Walk.js';
import User from './models/User.js';

//initialize express app
const app = express();
const port = process.env.PORT || 3000;
 
// connect to mongo db
mongoose.connect('mongodb://localhost:27017/walksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// set ejs as the templating engine
app.set('view engine', 'ejs');

//middleware setup
app.use(express.static('public')); // serve static files from 'public directory
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

// Use the authentication middleware
app.use(authMiddleware);

// Routes
app.use('/', userRoutes);
app.use('/', walkRoutes);
app.use('/', otherBlogRoutes);
app.use('/', newWalkRouter);

app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
});