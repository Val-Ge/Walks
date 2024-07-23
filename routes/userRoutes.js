import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
import { Router } from 'express';
const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
}); 

router.post('/register', async(req, res) => {
    const { name, email, password, password2 } = req.body;

    //basic server-side validation
    if(!name || !email || !password || !password2) {
        req.flash('error_msg', 'All fields are required');
        return res.redirect('/register');
    }

    if(password !== password2) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/register');
    }

    try {
        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/register')
        }

        //create and save new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login')
    } catch (error) {
        req.flash('error_msg','Error registering user');
        res.redirect('/register')
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/new',
    failureRedirect:'/login',
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