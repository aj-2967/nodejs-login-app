const { verifyToken } = require("./jwt");

// Verify validity of user before accessing protected endpoints
function auth(req, res, next) {
	const token = req.headers.authorization;

	if (!token || token.trim() === "") {
		return res.status(401).json({ success: false, error: "No token provided" });
	}

	const decodedToken = verifyToken(token);

	if (!decodedToken) {
		return res.status(401).json({ success: false, error: "Invalid token" });
	}

	req.user = decodedToken;
	next();
}

module.exports = { auth };
