const express = require("express");
const router = express.Router();
const { auth } = require("../auth/authMiddleware");
const { home } = require("../controllers/dashboardController");

router.get("/", auth, home);

module.exports = router;
