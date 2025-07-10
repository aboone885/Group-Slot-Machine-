import React from 'react';
import './WinMessage.css';

function WinMessage() {
  return (
    <div className="win-message">
      <h3>🎉 Congratulations! 🎉</h3>
      <p>You won! Three matching emojis!</p>
      <div className="celebration">🎊🎊🎊</div>
    </div>
  );
}

export default WinMessage; 