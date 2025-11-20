const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const busRoutes = require("./routes/busRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection (FIXED)
const mongoURL = "mongodb://127.0.0.1:27017/bus_booking";
mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
