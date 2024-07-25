// import { walkSchema } from '../schemas/walkSchemas.js';
// import Walk from '../models/Walk.js';

// // Create a new walk
// export const createWalk = async (req, res) => {
//     const { title, distance, difficulty, location, coordinates: coordsString } = req.body;
//     const imagePath = req.file ? req.file.path : null;

//     let coordinates = null;
//     if (coordsString) {
//         try {
//             // Parse coordinates from string
//             const parsedCoords = JSON.parse(coordsString);

//             // Handle both formats: object and array
//             if (Array.isArray(parsedCoords) && parsedCoords.length === 2) {
//                 coordinates = parsedCoords;
//             } else if (parsedCoords && typeof parsedCoords.lat === 'number' && typeof parsedCoords.lon === 'number') {
//                 coordinates = [parseFloat(parsedCoords.lat), parseFloat(parsedCoords.lon)];
//             } else {
//                 throw new Error('Invalid coordinates format');
//             }
//         } catch (error) {
//             console.error('Error parsing coordinates:', error);
//             req.flash('error_msg', 'Invalid coordinates format.');
//             return res.redirect('/new');
//         }
//     }

//     // Validate the data using Joi
//     const { error } = walkSchema.validate({ title, distance, difficulty, location, coordinates, image: imagePath });
//     if (error) {
//         console.error('Validation error:', JSON.stringify(error.details, null, 2));
//         req.flash('error_msg', error.details[0].message);
//         return res.redirect('/new');
//     }

//     try {
//         // Save the walk with coordinates
//         const newWalk = new Walk({
//             title,
//             distance,
//             difficulty,
//             location,
//             coordinates, // This should now be an array [lat, lng]
//             image: imagePath
//         });

//         await newWalk.save();
//         console.log('Walk added successfully');
//         req.flash('success_msg', 'Walk added successfully!');
//         res.redirect('/walks');
//     } catch (err) {
//         console.error('Error saving walk:', err);
//         req.flash('error_msg', 'Failed to add walk.');
//         res.redirect('/new');
//     }
// };
