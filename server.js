const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

// Schema for buses
const busSchema = new mongoose.Schema({
  busName: String,
  bookedDates: [String],
});

const Bus = mongoose.model("Bus", busSchema);

// Routes
app.get("/buses", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

app.post("/book", async (req, res) => {
  const { busName, date } = req.body;
  const bus = await Bus.findOne({ busName });
  if (bus) {
    bus.bookedDates.push(date);
    await bus.save();
    res.json(bus);
  } else {
    res.status(404).json({ error: "Bus not found" });
  }
});

app.delete("/book", async (req, res) => {
  const { busName, date } = req.body;
  const bus = await Bus.findOne({ busName });
  if (bus) {
    bus.bookedDates = bus.bookedDates.filter(d => d !== date);
    await bus.save();
    res.json(bus);
  } else {
    res.status(404).json({ error: "Bus not found" });
  }
});

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));