const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
}); 

router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/new',
    failureRedirect:'/userRoutes/login',
    failureFlash: true
}));

//logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router; 