import Joi from 'joi';

// Define a schema for walk
export const walkSchema = Joi.object({
    title: Joi.string().required(),
    distance: Joi.string().required(),
    difficulty: Joi.string().required(),
    location: Joi.string().required(),
    coordinates: Joi.object({
        lat: Joi.number().optional(),
        lon: Joi.number().optional()
    }).optional(),
    image: Joi.string().allow(null)  // Allowing string or null for the image field
});
