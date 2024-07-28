const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, mobile, password } = req.body;

    try {
        const user = new User({
            email,
            name,
            mobile,
            password: bcrypt.hashSync(password, 8)
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            mobile: user.mobile
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser: [
        // Validate and sanitize fields.
        body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
        body('name').isLength({ min: 1 }).trim().withMessage('Name is required').escape(),
        body('mobile').isMobilePhone().withMessage('Enter a valid mobile number').trim().escape(),
        body('password').isLength({ min: 6 }).trim().withMessage('Password must be at least 6 characters long').escape(),
        registerUser
    ],
    loginUser: [
        // Validate and sanitize fields.
        body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
        body('password').isLength({ min: 6 }).trim().withMessage('Password must be at least 6 characters long').escape(),
        loginUser
    ],
    getUserProfile
};
