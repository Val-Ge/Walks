const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Walk = require('../models/Walk')



router.get('/walks', async (req, res) => {
    try {
        const walks = await Walk.find(); // Fetch walks from the database
        res.render('walks', { walks: JSON.stringify(walks) }); // Pass walks as JSON string to the template
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/topwalks', async (req, res) => {
    try {
        const walks = await Walk.find({});
        console.log('Fetched walks:', walks); // Log the fetched data
        if (walks.length === 0) {
            console.log('No data found in the walks collection.');
        }
        res.render('topwalks', { title: 'Top Walks', walks });
    } catch (err) {
        console.error('Error fetching walks:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/new', (req, res) => {
    res.render('new');
})






module.exports = router;