import Joi from 'joi';

export const walkSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    distance: Joi.number().max(999).precision(2).required(), // Distance as a number with up to 2 decimal places
    unit: Joi.string().valid('km', 'miles').required(), // Unit must be km or miles
    difficulty: Joi.string().valid('very easy', 'easy', 'normal', 'hard', 'very hard').required(), // Validate difficulty with specific options
    location: Joi.string().min(3).max(30).required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(), // Expecting an array with exactly 2 numbers
    image: Joi.string().allow(null)
});

// Validation example
const walkData = {
    title: 'Morning Walk',
    distance: 4, // This should be valid
    difficulty: 'easy',
    unit: 'miles', // Added unit
    location: 'Central Park',
    coordinates: [40.785091, -73.968285],
    image: null
};

const { error, value } = walkSchema.validate(walkData);

if (error) {
    console.error('Validation error:', error.details);
} else {
    console.log('Validation successful:', value);
}