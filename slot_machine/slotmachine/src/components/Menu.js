import React from 'react';
import './Menu.css';

function Menu({ onStartGame }) {
  const handleFeedbackClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdSO6HHuEoD9qpPIcaeGLGZ8N8SB7dRv8utx8iRA2rC3FgHYw/viewform?usp=header', '_blank');
  };

  return (
    <div className="menu">
      <h1>🎰 Slot Machine Game 🎰</h1>
      <p>Welcome to the Slot Machine!</p>
      <button onClick={onStartGame} className="start-button">
        Start Playing
      </button>
      <button onClick={handleFeedbackClick} className="feedback-button">
        📝 Give Feedback
      </button>
    </div>
  );
}

export default Menu; 