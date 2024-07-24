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
    // image: Joi.object({
    //     fieldname: Joi.string().required(),
    //     originalname: Joi.string().required(),
    //     encoding: Joi.string().required(),
    //     mimetype: Joi.string().required(),
    //     destination: Joi.string().required(),
    //     filename: Joi.string().required(),
    //     path: Joi.string().required(),
    //     size: Joi.number().required()
    // }).optional()
});
