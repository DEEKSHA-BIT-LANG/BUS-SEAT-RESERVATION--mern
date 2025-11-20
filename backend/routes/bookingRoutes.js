const express = require("express");
const Bus = require("../models/Bus");
const router = express.Router();

// Get buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Add bus (admin)
router.post("/", async (req, res) => {
  const bus = new Bus(req.body);
  await bus.save();
  res.json(bus);
});
// Search buses by from, to, date
router.get("/search", async (req, res) => {
  const { from, to, date } = req.query;

  const query = {};
  if (from) query.from = from;
  if (to) query.to = to;
  if (date) query.date = date;

  try {
    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;