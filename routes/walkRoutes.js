import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import multer from 'multer';
import path from 'path';
import fetch from 'node-fetch';
import Walk from '../models/Walk.js'; //Imports the Walk model for database interactions.

import { createWalk } from '../controllers/walkControllers.js';

const router = express.Router();
const GEOCODE_API_KEY = process.env.OPENCAGE_API_KEY;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }); //Middleware for handling file uploads. dest specifies the directory to store uploaded files. could also be: const upload = multer({ dest: 'uploads/' });

// Route to display all walks
router.get('/walks', async (req, res) => {
    try {
        const walks = await Walk.find();
        res.render('walks', { walks: JSON.stringify(walks) });
    } catch (error) {
        console.error('Error fetching walks:', error);
        res.status(500).send('Server Error');
    }
});

// Route to display top walks
router.get('/topwalks', async (req, res) => {
    try {
        const walks = await Walk.find({});
        if (walks.length === 0) {
            console.log('No data found in the walks collection.');
        }
        res.render('topwalks', { title: 'Top Walks', walks });
    } catch (err) {
        console.error('Error fetching walks:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render new walk form
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle geocode API request
router.post('/geocode', async (req, res) => {
    const location = req.body.location;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODE_API_KEY}`;

    try {
        console.log(`Fetching URL: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            console.error('API response error:', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch coordinates' });
        }

        const data = await response.json();
        console.log('Geocode API Response:', JSON.stringify(data, null, 2));

        if (data.results && data.results.length > 0) {
            const { lat, lng: lon } = data.results[0].geometry;
            if (lat && lon) {
                res.json({ coordinates: { lat, lon } });
            } else {
                res.status(404).json({ error: 'Coordinates not found in the geometry object' });
            }
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ error: 'Error fetching coordinates' });
    }
});

// Route to handle new walk creation
router.post('/new', upload.single('image'), createWalk);

export default router;
