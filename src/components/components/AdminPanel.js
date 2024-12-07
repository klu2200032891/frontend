import React, { useState } from 'react';
import { FaEnvelope, FaUsers, FaCalendarPlus, FaChartBar, FaUsersCog } from 'react-icons/fa';
import User from './User'; // Adjust path if necessary
import Show from './Show';
import Achievements from './Achievements';
import AddEvent from './AddEvent'; // Ensure this component exists
import VisualizeAchievements from './VisualizeAchievements'; // New Component for visualizing achievements
import FetchParticipants from './FetchParticipants'; // New component to fetch participants

const AdminPanel = () => {
  const [view, setView] = useState('adminPanel');

  const handleViewStudentByEmail = () => setView('user');
  const handleViewAllStudents = () => setView('show');
  const handleViewStudentByEmailList = () => setView('emailList');
  const handleAddEvents = () => setView('addEvent');
  const handleVisualizeAchievements = () => setView('visualizeAchievements'); // New handler for visualizing achievements
  const handleViewParticipants = () => setView('participants'); // New handler for viewing participants
  const handleBackToAdminPanel = () => setView('adminPanel');

  const cardStyle = (bgColor) => ({
    background: `linear-gradient(135deg, ${bgColor.start}, ${bgColor.end})`,
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    textAlign: 'center',
    padding: '30px 20px',
    transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '280px',  // Adjusted for two cards per row
    margin: '15px',
  });

  const cardHoverStyle = {
    transform: 'scale(1.1)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #36D1DC, #5B86E5)',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  };

  const buttonHoverStyle = {
    transform: 'scale(1.1)',
    boxShadow: '0 10px 20px rgba(54, 209, 220, 0.5)',
  };

  const cardData = [
    {
      icon: <FaEnvelope size={40} />,
      title: 'View Student by Email',
      onClick: handleViewStudentByEmail,
      bgColor: { start: '#F9D423', end: '#FF4E50' },
    },
    {
      icon: <FaUsers size={40} />,
      title: 'View All Students',
      onClick: handleViewAllStudents,
      bgColor: { start: '#43C6AC', end: '#F8FFAE' },
    },
    {
      icon: <FaEnvelope size={40} />,
      title: 'View Students by Email List',
      onClick: handleViewStudentByEmailList,
      bgColor: { start: '#8E2DE2', end: '#4A00E0' },
    },
    {
      icon: <FaCalendarPlus size={40} />,
      title: 'Add Events',
      onClick: handleAddEvents,
      bgColor: { start: '#FF512F', end: '#DD2476' },
    },
    {
      icon: <FaChartBar size={40} />,
      title: 'Visualize Achievements',
      onClick: handleVisualizeAchievements,
      bgColor: { start: '#00C6FF', end: '#0072FF' },
    },
    {
      icon: <FaUsersCog size={40} />, // New icon for Participants
      title: 'View Participants',
      onClick: handleViewParticipants,
      bgColor: { start: '#36D1DC', end: '#5B86E5' },
    },
  ];

  if (view !== 'adminPanel') {
    const Component =
      view === 'user'
        ? User
        : view === 'show'
        ? Show
        : view === 'emailList'
        ? Achievements
        : view === 'addEvent'
        ? AddEvent
        : view === 'participants'
        ? FetchParticipants
        : VisualizeAchievements;

    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <Component />
        <button
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={handleBackToAdminPanel}
        >
          Back to Admin Panel
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 display-4" style={{ color: '#333', fontWeight: 'bold' }}>
        ✨ Admin Panel ✨
      </h1>
      <p className="text-center text-muted mb-5" style={{ fontSize: '1.2rem' }}>
        Manage students effortlessly with powerful tools.
      </p>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '900px',  // Adjusted width for two cards per row
          margin: '0 auto',
        }}
      >
        {cardData.map((card, index) => (
          <div
            key={index}
            style={cardStyle(card.bgColor)}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle(card.bgColor))}
            onClick={card.onClick}
          >
            {card.icon}
            <h5 className="mt-3" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              {card.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
