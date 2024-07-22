const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tips', (req, res) => {
    res.render('tips');
});








module.exports = router;