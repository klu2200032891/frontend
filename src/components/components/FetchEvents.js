import React, { useEffect, useState } from "react";

const FetchEvents = ({ setPage, email }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/events/") // Fetch events from the backend
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, [email]);

  const handleRegister = (event) => {
    const registrationData = {
      eventName: event.eventName,
      venue: event.venue,
      category: event.category,
      date: event.date,
      time: event.time,
      email: email,
    };

    fetch("http://localhost:8080/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (response.ok) {
          setMessage(`Successfully registered for ${event.eventName}!`);
        } else {
          setMessage(`Failed to register for ${event.eventName}.`);
        }
      })
      .catch((error) => {
        console.error("Error registering for event:", error);
        setMessage("An error occurred. Please try again later.");
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="events-container">
      <button onClick={() => setPage("city")} className="back-button">
        Back to Dashboard
      </button>

      <h1>Upcoming Events</h1>

      {/* Display the message */}
      {message && <div className="message-container">{message}</div>}

      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-content">
                <h2 className="event-name">{event.eventName}</h2>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>

                {/* Event Poster */}
                {event.poster && (
                  <img
                    src={`data:image/jpeg;base64,${event.poster}`}
                    alt={event.eventName}
                    className="event-poster"
                  />
                )}

                {/* Register Button */}
                <button
                  onClick={() => handleRegister(event)}
                  className="register-button"
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>

      <style jsx>{`
        .events-container {
          font-family: 'Arial', sans-serif;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2.5rem;
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        .back-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 20px;
          display: block;
          margin: 0 auto;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: #0056b3;
        }

        .message-container {
          padding: 15px;
          background-color: #e0ffe0;
          color: #4CAF50;
          border: 1px solid #4CAF50;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        .events-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 10px;
        }

        .event-card {
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .event-card:hover {
          transform: translateY(-5px);
        }

        .event-content {
          padding: 20px;
        }

        .event-name {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 10px;
        }

        .event-name,
        p {
          margin: 5px 0;
        }

        .event-poster {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          margin-top: 15px;
        }

        .register-button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 15px;
          transition: background-color 0.3s ease;
        }

        .register-button:hover {
          background-color: #218838;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FetchEvents;
