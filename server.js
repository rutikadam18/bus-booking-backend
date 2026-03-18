const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Step 3: Schema & Model
const busSchema = new mongoose.Schema({
  busName: String,
  bookedDates: [String],
});

const Bus = mongoose.model("Bus", busSchema);

// ✅ Step 4: Routes

// GET all buses
app.get("/buses", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// POST booking for a bus
app.post("/buses", async (req, res) => {
  try {
    const { busName, bookedDates } = req.body;
    const bus = await Bus.findOne({ busName });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // ✅ Prevent duplicates
    bookedDates.forEach((date) => {
      if (!bus.bookedDates.includes(date)) {
        bus.bookedDates.push(date);
      }
    });

    await bus.save();
    res.json({ message: "Booking saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving booking" });
  }
});

// ✅ Step 5: Seed buses (run once to create Bus A, B, C)
async function seedBuses() {
  const count = await Bus.countDocuments();
  if (count === 0) {
    await Bus.insertMany([
      { busName: "Bus A", bookedDates: [] },
      { busName: "Bus B", bookedDates: [] },
      { busName: "Bus C", bookedDates: [] },
    ]);
    console.log("Buses seeded!");
  }
}
seedBuses();

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));