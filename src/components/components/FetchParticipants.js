import React, { useState, useEffect } from 'react';

const FetchParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch participants data from backend
  useEffect(() => {
    fetch('/api/participants')  // Adjust the URL if necessary (e.g., add localhost or other endpoint path)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch participants');
        }
        return response.json();
      })
      .then((data) => {
        setParticipants(data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render loading or error state
  if (loading) {
    return <div className="container mt-5"><h3>Loading participants...</h3></div>;
  }

  if (error) {
    return <div className="container mt-5"><h3>Error: {error}</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Participants</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Venue</th>
            <th>Category</th>
            <th>Date</th>
            <th>Time</th>
            <th>Email</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {participants.length === 0 ? (
            <tr>
              <td colSpan="8">No participants found</td>
            </tr>
          ) : (
            participants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.eventName}</td>
                <td>{participant.venue}</td>
                <td>{participant.category}</td>
                <td>{participant.date}</td>
                <td>{participant.time}</td>
                <td>{participant.email}</td>
                <td>
                  {participant.poster ? (
                    <img
                      src={`data:image/jpeg;base64,${participant.poster}`}
                      alt={participant.eventName}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No Poster</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FetchParticipants;
