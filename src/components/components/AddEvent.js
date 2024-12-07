import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    venue: "",
    category: "",
    date: "",
    time: "",
  });

  const [poster, setPoster] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("venue", eventData.venue);
    formData.append("category", eventData.category);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    if (poster) {
      formData.append("poster", poster);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Event added successfully!");
      setErrorMessage("");
      setEventData({
        eventName: "",
        venue: "",
        category: "",
        date: "",
        time: "",
      });
      setPoster(null);
    } catch (error) {
      setErrorMessage("Failed to add the event. Please try again.");
      setSuccessMessage("");
      console.error(error);
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
    textAlign: "left",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const inputFocusStyle = {
    borderColor: "#4caf50",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const messageStyle = (color) => ({
    color,
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
  });

  const customFileInputStyle = {
    display: "none",
  };

  const customButtonStyle = {
    padding: "12px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Add Event</h2>
      {successMessage && <p style={messageStyle("green")}>{successMessage}</p>}
      {errorMessage && <p style={messageStyle("red")}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="eventName">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="venue">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={eventData.venue}
            onChange={handleInputChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="poster">
            Poster
          </label>
          <input
            type="file"
            id="poster"
            name="poster"
            accept="image/*"
            onChange={handlePosterChange}
            style={customFileInputStyle}
          />
          <label htmlFor="poster" style={customButtonStyle}>
            Choose File
          </label>
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style = { ...buttonStyle, ...buttonHoverStyle }}
          onMouseOut={(e) => e.target.style = buttonStyle}
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
