import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import { registerUser, loginUser } from '../controllers/userControllers.js';
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
}); 

// Use the controller functions for handling registration and login
router.post('/register', registerUser);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/new',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


//logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err); //pass errors to the next middleware
        }
    
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
    });
});

export default router; 