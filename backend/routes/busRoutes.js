const express = require("express");
const Bus = require("../models/Bus");

const router = express.Router();

// ======================
// GET all buses
// ======================
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// SEARCH buses
// ======================
router.post("/search", async (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ message: "Please provide both from and to" });
  }

  try {
    const buses = await Bus.find({
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") }
    });

    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// GET single bus by ID
// (needed for price + details)
// ======================
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// GET booked seats for a bus
// ======================
router.get("/:id/seats", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json({ seats: bus.bookedSeats || [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// BOOK seats
// ======================
router.post("/:id/book", async (req, res) => {
  const { seats } = req.body;

  if (!seats || seats.length === 0) {
    return res.status(400).json({ message: "No seats selected" });
  }

  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (!bus.bookedSeats) bus.bookedSeats = [];

    // Check if seats already booked
    const alreadyBooked = seats.some(s => bus.bookedSeats.includes(s));

    if (alreadyBooked) {
      return res.status(400).json({ message: "Some seats already booked!" });
    }

    // Add new seats
    bus.bookedSeats.push(...seats);
    await bus.save();

    res.json({
      message: "Seats booked successfully",
      bookedSeats: bus.bookedSeats
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
