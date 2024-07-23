import { registrationSchema, loginSchema } from '../schemas/userSchemas.js';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    // Validate the request body against the Joi schema
    const { error, value } = registrationSchema.validate(req.body);

    if (error) {
        req.flash('error_msg', error.details.map(detail => detail.message).join(', '));
        return res.redirect('/register');
    }

    const { name, email, password, password2 } = value;

    // Basic server-side validation
    if (password !== password2) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/register');
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/register');
        }

        // Create and save new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (error) {
        req.flash('error_msg', 'Error registering user');
        res.redirect('/register');
    }
};

export const loginUser = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        req.flash('error_msg', error.details.map(detail => detail.message).join(', '));
        return res.redirect('/login');
    }

    passport.authenticate('local', {
        successRedirect: '/new',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};
