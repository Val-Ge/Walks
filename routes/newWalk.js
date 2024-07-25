import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express from 'express';
import multer from 'multer';
import Walk from '../models/Walk.js'; // Adjust the path as needed
import path from 'path';
import axios from 'axios';
import { walkSchema } from '../schemas/walkSchemas.js'; // Import your Joi schema

const router = express.Router();
const OPEN_CAGE_API_KEY = process.env.OPENCAGE_API_KEY

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Render the form page
router.get('/new', (req, res) => {
  res.render('new'); // Ensure this corresponds to the correct EJS template
});

// Handle form submission
router.post('/new', upload.single('image'), async (req, res) => {
  try {
    // Extract form data
    const { title, distance, unit, difficulty, location} = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

     // Fetch coordinates from OpenCage API
     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: location,
        key: OPEN_CAGE_API_KEY
      }
    });

    
    const coordinates = response.data.results[0]?.geometry
    ? [response.data.results[0].geometry.lat, response.data.results[0].geometry.lng]
    : [0, 0];

// Validate the form data
const { error, value } = walkSchema.validate({
  title,
  distance: parseFloat(distance), // Ensure distance is a number
  unit,
  difficulty,
  location,
  coordinates,
  image// Will be filled in after API call
});

if (error) {
  req.flash('error_msg', 'Validation error: ' + error.details[0].message);
  return res.redirect('/new');
}


 
    const newWalk = new Walk(value);

    await newWalk.save();

    // Redirect or render success page
    req.flash('success_msg', 'Walk added successfully!');
    res.redirect('/walks'); // Redirect to a list or map of walks
  } catch (error) {
    console.error('Error adding walk:', error);
    req.flash('error_msg', 'Error adding walk. Please try again.');
    res.redirect('/new'); // Redirect back to the form if there is an error
  }
});

export default router;

