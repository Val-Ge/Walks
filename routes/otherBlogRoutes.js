import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';
const router = Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tips', (req, res) => {
    res.render('tips');
});


export default router;