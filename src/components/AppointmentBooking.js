import React, { useState, useEffect } from "react";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    testType: "",
    timeSlot: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);

  // Fetch available time slots from backend
  useEffect(() => {
    if (formData.date) {
      fetch(`http://localhost:8000/api/available-slots?date=${formData.date}`)
        .then((res) => res.json())
        .then((data) => setTimeSlots(data))
        .catch((err) => console.error("Error fetching slots:", err));
    }
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <select name="testType" onChange={handleChange} required>
          <option value="">Select Test Type</option>
          <option value="Blood Test">Blood Test</option>
          <option value="X-Ray">X-Ray</option>
        </select>
        <select name="timeSlot" onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
