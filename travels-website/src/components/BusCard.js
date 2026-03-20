import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "../App.css";

function BusCard({ busName }) {
  const [bookedDates, setBookedDates] = useState([]);

  // fetch bookings for this bus
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("const API_BASE_URL = process.env.REACT_APP_API_URL;");
        const bus = res.data.find((b) => b.busName === busName);
        if (bus) setBookedDates(bus.bookedDates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [busName]);

  const tileClassName = ({ date }) => {
    const formatted = date.toISOString().split("T")[0];
    return bookedDates.includes(formatted) ? "booked-date" : null;
  };

  const handleClickDay = async (value) => {
    const formatted = value.toISOString().split("T")[0];
    const isBooked = bookedDates.includes(formatted);

    if (isBooked) {
      if (window.confirm(`Cancel booking for ${busName} on ${formatted}?`)) {
        try {
          const res = await axios.post("http://localhost:5000/cancel", {
            busName,
            date: formatted,
          });
          setBookedDates(res.data.bookedDates);
          alert("Booking cancelled!");
        } catch (err) {
          alert("Error cancelling");
        }
      }
    } else {
      if (window.confirm(`Book ${busName} on ${formatted}?`)) {
        try {
          const res = await axios.post("http://localhost:5000/book", {
            busName,
            date: formatted,
          });
          setBookedDates(res.data.bookedDates);
          alert("Booking successful!");
        } catch (err) {
          alert("Error booking");
        }
      }
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{busName}</h5>
        <Calendar
          tileClassName={tileClassName}
          onClickDay={handleClickDay}
        />
      </div>
    </div>
  );
}

export default BusCard;