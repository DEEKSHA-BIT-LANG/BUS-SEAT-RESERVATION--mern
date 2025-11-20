const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  busId: { type: String, required: true },
  userName: { type: String, required: true },
  seatsBooked: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
}, { timestamps: true }); // optional, adds createdAt and updatedAt

module.exports = mongoose.model("Booking", bookingSchema);
