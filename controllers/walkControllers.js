import { walkSchema } from '../schemas/walkSchemas.js';
import Walk from '../models/Walk.js';

// Create a new walk
export const createWalk = async (req, res) => {
    const { title, distance, difficulty, location, coordinates: coordsString } = req.body;
    const imagePath = req.file ? req.file.path : null;
    // const image = req.file ? {
    //     fieldname: req.file.fieldname,
    //     originalname: req.file.originalname,
    //     encoding: req.file.encoding,
    //     mimetype: req.file.mimetype,
    //     destination: req.file.destination,
    //     filename: req.file.filename,
    //     path: req.file.path,
    //     size: req.file.size
    // } : null;

    let coordinates = null;
    if (coordsString) {
        try {
            const parsedCoords = JSON.parse(coordsString);

            if (parsedCoords && typeof parsedCoords.lat === 'number' && typeof parsedCoords.lon === 'number') {
                coordinates = {
                    lat: parseFloat(parsedCoords.lat),
                    lon: parseFloat(parsedCoords.lon)
                };
            } else {
                throw new Error('Invalid coordinates format');
            }
        } catch (error) {
            console.error('Error parsing coordinates:', error);
            req.flash('error_msg', 'Invalid coordinates format.');
            return res.redirect('/new');
        }
    }

    const { error } = walkSchema.validate({ title, distance, difficulty, location, coordinates, image: imagePath });
    if (error) {
        console.error('Validation error:', JSON.stringify(error.details, null, 2));
        req.flash('error_msg', error.details[0].message);
        return res.redirect('/new');
    }

    try {
        const newWalk = new Walk({
            title,
            distance,
            difficulty,
            location,
            coordinates,
            image: imagePath
            //   image: req.file ? {
            //     fieldname: req.file.fieldname,
            //     originalname: req.file.originalname,
            //     encoding: req.file.encoding,
            //     mimetype: req.file.mimetype,
            //     destination: req.file.destination,
            //     filename: req.file.filename,
            //     path: req.file.path,
            //     size: req.file.size
            // } : null
        });

        await newWalk.save();
        console.log('Walk added successfully');
        req.flash('success_msg', 'Walk added successfully!');
        res.redirect('/walks');
    } catch (err) {
        console.error('Error saving walk:', err);
        req.flash('error_msg', 'Failed to add walk.');
        res.redirect('/new');
    }
};


