import React, { useState } from "react";
import axios from "axios";

function BookingForm() {
  const [busName, setBusName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevents page reload
    try {
      const response = await axios.post(
        "https://bus-booking-backend-k366.onrender.com/",
        {
          busName,
          bookedDates: [date],
        }
      );
      alert(response.data.message || "Booking saved successfully!");
      setBusName("");
      setDate("");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error saving booking");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Book a Bus</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Bus Name</label>
          <input
            type="text"
            className="form-control"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* ✅ Button must be type="submit" */}
        <button type="submit" className="btn btn-primary w-100">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingForm;