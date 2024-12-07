import React, { useState } from "react";
import axios from "axios";

const Achievements = () => {
  const [email, setEmail] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState("");
  const [editAchievement, setEditAchievement] = useState(null);

  // Fetch achievements by email
  const fetchAchievements = async () => {
    setError(""); // Clear previous error messages
    try {
      const response = await axios.get(
        `http://localhost:8080/api/achievements/email/${email}`
      );
      setAchievements(response.data);
    } catch (err) {
      if (err.response && err.response.status === 204) {
        setError("No achievements found for this email.");
      } else {
        setError("An error occurred while fetching achievements.");
      }
    }
  };

  // Update achievement
  const updateAchievement = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/achievements/${editAchievement.id}`,
        editAchievement
      );
      fetchAchievements(); // Refresh the achievements list
      setEditAchievement(null); // Clear the edit form
    } catch (err) {
      setError("An error occurred while updating the achievement.");
    }
  };

  // Delete achievement
  const deleteAchievement = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/achievements/${id}`);
      fetchAchievements(); // Refresh the achievements list
    } catch (err) {
      setError("An error occurred while deleting the achievement.");
    }
  };

  // Handle change for editing an achievement
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAchievement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Search Achievements</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={fetchAchievements}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {achievements.length > 0 && (
        <div>
          <h3>Achievements for {email}:</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Place</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Achievement Type
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Level</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Participants
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((achievement) => (
                <tr key={achievement.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.title}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.date}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.place}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.category}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.achievementType}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.level}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {achievement.participants}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => setEditAchievement(achievement)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ffa500",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAchievement(achievement.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Achievement Form */}
      {editAchievement && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Achievement</h3>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="title"
              value={editAchievement.title}
              onChange={handleEditChange}
              placeholder="Title"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="date"
              value={editAchievement.date}
              onChange={handleEditChange}
              placeholder="Date"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="place"
              value={editAchievement.place}
              onChange={handleEditChange}
              placeholder="Place"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="category"
              value={editAchievement.category}
              onChange={handleEditChange}
              placeholder="Category"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="achievementType"
              value={editAchievement.achievementType}
              onChange={handleEditChange}
              placeholder="Achievement Type"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="level"
              value={editAchievement.level}
              onChange={handleEditChange}
              placeholder="Level"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <input
              type="text"
              name="participants"
              value={editAchievement.participants}
              onChange={handleEditChange}
              placeholder="Participants"
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "300px",
                marginBottom: "10px",
                display: "block",
              }}
            />
            <button
              onClick={updateAchievement}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Update Achievement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
