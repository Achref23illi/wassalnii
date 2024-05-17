// backend/routes/tripRoutes.js
const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const authenticate = require("../middleware/authenticate");
const mongoose = require("mongoose");

// Endpoint to search for available trips
// Endpoint to search for available trips
router.get("/search", authenticate, async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0); // start of the day
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999); // end of the day

    const trips = await Trip.find({
      from,
      to,
      date: { $gte: startDate, $lte: endDate },
      status: "available",
      numberOfSeats: { $gt: 0 }, // Ensure trips have at least one seat available
    }).populate("driver", "username");

    res.json(
      trips.map((trip) => ({
        ...trip.toObject(),
        isFullyBooked: trip.numberOfSeats === 0,
      }))
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint for passengers to book a trip
// backend/routes/tripRoutes.js
router.post("/book", authenticate, async (req, res) => {
  const { tripId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ msg: "Invalid trip ID format" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const trip = await Trip.findById(tripId).session(session);
    if (!trip) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ msg: "Trip not found" });
    }

    // Check if the trip is already fully booked
    if (trip.passengers.length >= trip.numberOfSeats) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ msg: "This trip is fully booked" });
    }

    // Check if the user has already booked this trip
    if (trip.passengers.includes(req.user.id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ msg: "You have already booked this trip" });
    }

    // Add user to passengers array and decrement the number of seats
    trip.passengers.push(req.user.id);
    trip.numberOfSeats -= 1; // Decrement the available seats
    await trip.save({ session: session });

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Trip booked successfully", trip });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error booking trip:", err);
    res.status(500).send("Server Error");
  }
});

// Endpoint for drivers to publish a new trip
// Endpoint for drivers to publish a new trip
router.post("/", authenticate, async (req, res) => {
  const { from, to, date, time, numberOfSeats, price } = req.body;
  try {
    const newTrip = new Trip({
      driver: req.user.id,
      from,
      to,
      date: new Date(date),
      time,
      numberOfSeats,
      price,
    });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to retrieve trips published by the driver
router.get("/driver", authenticate, async (req, res) => {
  try {
    const driverId = req.user.id;

    const trips = await Trip.find({ driver: driverId }).populate(
      "driver",
      "username"
    );

    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to retrieve history of trips
router.get("/history", authenticate, async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [{ passengers: req.user.id }, { driver: req.user.id }],
    }).populate("driver passengers", "username email");
    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
