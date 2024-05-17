// backend/routes/secureRoutes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Secure data route
router.get("/secure-data", authenticate, (req, res) => {
  res.json({ message: "This is secure data", user: req.user });
});

// Update profile route
router.post("/user/update-profile", authenticate, (req, res) => {
  // Assuming some logic to update user profile
  res.send("Profile updated successfully!");
});

module.exports = router;
