
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import multer from 'multer';
import path from 'path';
import fetch from 'node-fetch';
import Walk from '../models/Walk.js'; //Imports the Walk model for database interactions.

// import { createWalk } from '../controllers/walkControllers.js';

const router = express.Router();
const GEOCODE_API_KEY = process.env.OPENCAGE_API_KEY;


router.get('/walks', async (req, res) => {
  try {
    const walks = await Walk.find(); // Fetch all walks from the database
    res.render('walks', { walks }); // Pass the walks data to the EJS template
  } catch (error) {
    console.error('Error fetching walks:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/topwalks', async (req, res) => {
    try {
      // Fetch walks from the database
      const walks = await Walk.find().limit(10); // Adjust query as needed
      res.render('topwalks', { walks }); // Pass walks data to EJS template
    } catch (error) {
      console.error('Error fetching top walks:', error);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;




