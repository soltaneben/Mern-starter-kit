const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route POST api/auth
// @desc  Register new user
// @access Public
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple Verification
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please verify your email and password and try again' });
	}

	// Check the email and password are correct
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'Please check your email and password and try again' });
		// Validate password
		// this method returns a boolean
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
			jwt.sign(
				{
					id: user.id,
					email: user.email
				},
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							name: user.email,
							email: user.email
						}
					});
				}
			);
		});
	});
});

// @route GET api/auth/user
// @desc  Get user data
// @access Private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id).select('-password').then((user) => res.json(user));
});

module.exports = router;
