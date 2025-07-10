import React, { useState, useEffect } from 'react';
import SlotReel from './SlotReel';
import WinMessage from './WinMessage';
import './SlotMachine.css';

function SlotMachine({ onBackToMenu }) {
  const [slotEmojis, setSlotEmojis] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState(false);
  
  const emojis = ['🍎', '🍊', '🍇', '🍒', '🍋', '🍉', '🍓', '🍑'];

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setPrizeWon(false);
    
    // Simulate spinning animation
    const spinInterval = setInterval(() => {
      setSlotEmojis([
        Math.floor(Math.random() * emojis.length),
        Math.floor(Math.random() * emojis.length),
        Math.floor(Math.random() * emojis.length)
      ]);
    }, 100);
    
    // Stop spinning after 2 seconds
    setTimeout(() => {
      clearInterval(spinInterval);
      const finalEmojis = [
        Math.floor(Math.random() * emojis.length),
        Math.floor(Math.random() * emojis.length),
        Math.floor(Math.random() * emojis.length)
      ];
      setSlotEmojis(finalEmojis);
      setIsSpinning(false);
      
      // Check for win
      if (finalEmojis[0] === finalEmojis[1] && finalEmojis[1] === finalEmojis[2]) {
        setPrizeWon(true);
      }
    }, 2000);
  };

  return (
    <div className="slot-machine">
      <h2>🎰 Slot Machine 🎰</h2>
      
      <div className="slot-reels">
        <SlotReel emoji={emojis[slotEmojis[0]]} isSpinning={isSpinning} />
        <SlotReel emoji={emojis[slotEmojis[1]]} isSpinning={isSpinning} />
        <SlotReel emoji={emojis[slotEmojis[2]]} isSpinning={isSpinning} />
      </div>
      
      <button onClick={spin} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Spinning...' : 'Spin!'}
      </button>
      
      {prizeWon && <WinMessage />}
      
      <button onClick={onBackToMenu} className="back-button">
        Back to Menu
      </button>
    </div>
  );
}

export default SlotMachine; 