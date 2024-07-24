// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables

// import mongoose from 'mongoose';
// import express from 'express';
// const router = express.Router();
// import Walk from '../models/Walk.js';
// import multer from 'multer';
// import path from 'path';
// import { check, validationResult } from 'express-validator'; 
// import { createWalk } from '../controllers/walkControllers.js'; // Correct import statement
// import fetch from 'node-fetch';
// const GEOCODE_API_KEY = process.env.OPENCAGE_API_KEY

// //set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// router.get('/walks', async (req, res) => {
//     try {
//         const walks = await Walk.find(); // Fetch walks from the database
//         res.render('walks', { walks: JSON.stringify(walks) }); // Pass walks as JSON string to the template
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

// router.get('/topwalks', async (req, res) => {
//     try {
//         const walks = await Walk.find({});
//         console.log('Fetched walks:', walks); // Log the fetched data
//         if (walks.length === 0) {
//             console.log('No data found in the walks collection.');
//         }
//         res.render('topwalks', { title: 'Top Walks', walks });
//     } catch (err) {
//         console.error('Error fetching walks:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.get('/new', (req, res) => {
//     res.render('new');
// })

// router.post('/geocode', async (req, res) => {
//     const location = req.body.location;
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODE_API_KEY}`;

//     try {
//         console.log(`Fetching URL: ${url}`); // Log the URL to ensure it's correct

//         const response = await fetch(url);
//         if (!response.ok) {
//             // Log status code and status text
//             console.error('API response error:', response.status, response.statusText);
//             return res.status(response.status).json({ error: 'Failed to fetch coordinates' });
//         }

//         const data = await response.json();
//         console.log('Geocode API Response:', JSON.stringify(data, null, 2)); // Log the full response

//         if (data.results && data.results.length > 0) {
//             const geometry = data.results[0].geometry;
//             const lat = geometry ? geometry.lat : null;
//             const lon = geometry ? geometry.lng : null;

//             if (lat !== null && lon !== null) {
//                 res.json({ coordinates: { lat, lon } });
//             } else {
//                 res.status(404).json({ error: 'Coordinates not found in the geometry object' });
//             }
//         } else {
//             res.status(404).json({ error: 'Location not found' });
//         }
//     } catch (error) {
//         // Log the error message and stack trace
//         console.error('Error fetching coordinates:', error.message);
//         console.error(error.stack);
//         res.status(500).json({ error: 'Error fetching coordinates' });
//     }
// });


// // Debug in the route handler for /new
// // router.post('/new', upload.single('image'), async (req, res) => {
// //     try {
// //         // Process the request here
// //         console.log('FormData Received:', req.body);
// //         // Add more logic or debugging as needed
// //     } catch (error) {
// //         console.error('Error in /new route:', error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// router.post('/new', createWalk);

// export default router; 

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import multer from 'multer';
import path from 'path';
import fetch from 'node-fetch';
import Walk from '../models/Walk.js';
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
const upload = multer({ storage: storage });

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
router.post('/new', createWalk);

export default router;
