const config = require('config');
const jwt = require('jsonwebtoken');

// Middleware function
function auth(req, res, next) {
	const token = req.header('x-auth-token');
	// Check for token
	if (!token) return res.status(401).json({ msg: 'Token missing, Authorization deined' });

	try {
		// Verify Token
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		// Att user from payload
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;
