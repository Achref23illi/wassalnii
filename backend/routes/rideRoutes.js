// backend/routes/rideRoutes.js
const express = require("express");
const router = express.Router();

// Route to create a ride
router.post("/", (req, res) => {
  res.status(201).send("Ride created successfully");
});

// Route to get a specific ride
router.get("/:rideId", (req, res) => {
  res.status(200).send(`Fetching ride with ID: ${req.params.rideId}`);
});

// Route to update a specific ride
router.put("/:rideId", (req, res) => {
  res.status(200).send(`Updating ride with ID: ${req.params.rideId}`);
});

module.exports = router;
