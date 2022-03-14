const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User Model
const User = require('../../models/User');

// @route POST api/users
// @desc  Register new user
// @access Public
router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	// Simple Verification
	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check fjor existing user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: 'Email already exist' });
		const newUser = new User({
			name,
			email,
			password
		});
		// Create Salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

module.exports = router;
