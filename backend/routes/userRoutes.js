// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Using the authenticate middleware in the profile route
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET /api/users/:id - Fetch a user's public profile data
router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/users/:id - Update user profile information
router.put("/:id", authenticate, async (req, res) => {
  const { username, email, password } = req.body;

  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Ensure the user making the request is the user being updated
    if (user.id !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Logout Endpoint
router.post("/logout", authenticate, (req, res) => {
  // Invalidate the token (In practice, you'd implement a token blacklist)
  res.status(200).json({ msg: "User logged out successfully" });
});

// PUT /api/users/settings/privacy - Updates user privacy settings
router.put("/settings/privacy", authenticate, async (req, res) => {
  const { privacySettings } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.privacySettings = privacySettings;

    await user.save();
    res.json({
      msg: "Privacy settings updated successfully",
      privacySettings: user.privacySettings,
    });
  } catch (err) {
    console.error("Error updating privacy settings:", err.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/users/settings/security - Updates security settings like password
router.put("/settings/security", authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ msg: "Security settings updated successfully" });
  } catch (err) {
    console.error("Error updating security settings:", err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
