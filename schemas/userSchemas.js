import Joi from 'joi';

// Define a schema for registration
export const registrationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(8)
    .max(30)
    // .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/) // Combined pattern
    .required() // Field is required
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password can be up to 30 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
      'any.required': 'Password is required'
    }),
    password2: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
  })
});

// Define the schema for login (assuming password is the only field required for login)
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8) // Minimum length
      .max(30) // Maximum length (optional)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,30}$/) // Combined pattern
      .required() // Field is required
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password can be up to 30 characters long',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        'any.required': 'Password is required'
      })
  });








