import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();
import Walk from '../models/Walk.js';
import multer from 'multer';
import path from 'path';
import { check, validationResult } from 'express-validator'; 
import fetch from 'node-fetch';
const GEOCODE_API_KEY = process.env.OPENCAGE_API_KEY

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

router.post('/geocode', async (req, res) => {
    const location = req.body.location;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const coordinates = data.results[0].geometry;
            res.json({ coordinates: [coordinates.lat, coordinates.lng] });
        } else {
            res.status(404).json({ error: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching coordinates' });
    }
});

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

            const response = await fetch('/geocode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location })
            });

            const data = await response.json();
            if (!data.coordinates) {
                throw new Error('Failed to fetch coordinates');
            }

            const newWalk = new Walk({
                title,
                distance,
                difficulty,
                location,
                coordinates: data.coordinates,
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


export default router; 