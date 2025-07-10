import React from 'react';
import './Menu.css';

function Menu({ onStartGame }) {
  return (
    <div className="menu">
      <h1>🎰 Slot Machine Game 🎰</h1>
      <p>Welcome to the Slot Machine!</p>
      <button onClick={onStartGame} className="start-button">
        Start Playing
      </button>
    </div>
  );
}

export default Menu; 