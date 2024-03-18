const express = require("express");
const router = express.Router();
const { auth } = require("../auth/authMiddleware");
const { loginUser, registerUser, getUserDetails } = require("../controllers/authController");

router.get("/", auth, getUserDetails);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
