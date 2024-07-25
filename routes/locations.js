const express = require('express');
const router = express.Router();

// Import your model to fetch the posts
const Walk = require('../models/Walk'); // Adjust the path as necessary

// Route handler for Bedfordshire
router.get('/bedfordshire', async (req, res) => {
    try {
        const walks = await Walk.find({ location: 'Bedfordshire' });
        res.render('location', { title: 'Bedfordshire Walks', walks });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route handler for Cambridgeshire
router.get('/cambridgeshire', async (req, res) => {
    try {
        const walks = await Walk.find({ location: 'Cambridgeshire' });
        res.render('location', { title: 'Cambridgeshire Walks', walks });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route handler for Northamptonshire
router.get('/northamptonshire', async (req, res) => {
    try {
        const walks = await Walk.find({ location: 'Northamptonshire' });
        res.render('location', { title: 'Northamptonshire Walks', walks });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;