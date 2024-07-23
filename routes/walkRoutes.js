// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Walk = require('../models/Walk')
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator'); 

//set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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


router.post('/new',
    upload.single('image'),
    [
        check('walk.title').not().isEmpty().withMessage('Title is required'),
        check('walk.distance').not().isEmpty().withMessage('Distance is required'),
        check('walk.difficulty').not().isEmpty().withMessage('Difficulty is required'),
        check('walk.location').not().isEmpty().withMessage('Location is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array()); // Added for debugging
            req.flash('error_msg', errors.array().map(err => err.msg).join(', '));
            return res.redirect('/new');
        }

        try {
            console.log('Form data received:', req.body);
            console.log('File data received:', req.file);

            const { title, distance, difficulty, location } = req.body.walk;
            const image = req.file ? req.file.filename : '';

            const newWalk = new Walk({
                title,
                distance,
                difficulty,
                location,
                image
            });

            await newWalk.save();

            req.flash('success_msg', 'Walk added successfully');
            res.redirect('/walks');
        } catch (error) {
            console.error('Error saving to database:', error); // Added for debugging
            console.error(error);
            req.flash('error_msg', 'Error adding walk');
            res.redirect('/new');
        }
    }
);


module.exports = router;