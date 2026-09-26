const express = require("express");
const { login, signup, signupValidation, me } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signupValidation, signup);
router.get("/me", requireAuth, me);

// No /logout endpoint: JWTs are stateless, so "logging out" just means the
// frontend deletes the token it's holding. Nothing to tell the server.

module.exports = router;
