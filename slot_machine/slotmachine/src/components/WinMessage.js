import React from 'react';
import './WinMessage.css';

function WinMessage({ prizeAmount, winningEmoji }) {
  return (
    <div className="win-message">
      <h3>🎉 Congratulations! 🎉</h3>
      <p>You won ${prizeAmount.toLocaleString()} with three {winningEmoji}!</p>
      <div className="celebration">🎊🎊🎊</div>
    </div>
  );
}

export default WinMessage; 