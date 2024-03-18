const bcrypt = require("bcrypt");
const pool = require("../db/db");
const { generateToken } = require("../auth/jwt");
const { isEmpty } = require("../utils/helpers");

async function registerUser(req, res) {
	const { name, email, password } = req.body;

	// Error handling
	if (isEmpty(name, email, password)) {
		return res.status(400).json({ success: false, error: "Please enter all required fields" });
	}

	try {
		const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
		if (userExists.rows.length > 0) {
			return res.status(400).json({
				success: false,
				error: "User already exists, please use a different email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await pool.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, hashedPassword]
		);

		// Generate JWT token
		const token = generateToken(newUser.rows[0]);

		res.status(200).json({
			success: true,
			message: "User registered successfully",
			token: token,
		});
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
}

async function loginUser(req, res) {
	const { email, password } = req.body;

	// Error handling
	if (isEmpty(email, password)) {
		return res.status(400).json({ success: false, error: "Please enter all required fields" });
	}

	try {
		// Find user by email
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
		if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
			return res.status(401).json({ success: false, error: "Invalid credentials" });
		}

		// Generate JWT token
		const token = generateToken(user.rows[0]);

		res.json({ message: "Login successful", token: token });
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

async function getUserDetails(req, res) {
	const userId = req.user.id;

	try {
		// Find user by id
		const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
		if (user.rows.length === 0) {
			return res.status(404).json({ success: false, error: "User not found" });
		}

		userName = user.rows[0].name;

		res.status(200).json({ success: true, data: { name: userName } });
	} catch (error) {
		res.status(500).json({ success: false, error: "Internal server error" });
	}
}

module.exports = { registerUser, loginUser, getUserDetails };
