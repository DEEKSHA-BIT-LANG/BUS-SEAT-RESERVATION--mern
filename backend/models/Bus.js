const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, default: "" },
  seats: { type: Number, default: 40 },

  // NEW FIELD – stores booked seat numbers
  bookedSeats: {
    type: [Number],  // array of seat numbers
    default: []
  }
});

module.exports = mongoose.model("Bus", busSchema);
