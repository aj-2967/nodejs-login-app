const { Pool } = require("pg");
// require("dotenv").config();

// Initialize PostgreSQL connection pool
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT
});


// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
	if (err) {
		console.error("Error connecting to PostgreSQL database:", err);
	} else {
		console.log("Successfully connected to PostgreSQL database.");
		console.log("Current timestamp from the database:", res.rows[0].now);
	}

	pool.end();
});
