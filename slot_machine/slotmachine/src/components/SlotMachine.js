import React, { useState, useEffect, useRef } from 'react';
import SlotReel from './SlotReel';
import WinMessage from './WinMessage';
import './SlotMachine.css';

function SlotMachine({ onBackToMenu }) {
  const [slotEmojis, setSlotEmojis] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState(false);
  const [money, setMoney] = useState(10000);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [winningEmoji, setWinningEmoji] = useState('');
  const [prizeAmount, setPrizeAmount] = useState(0);
  const audioRef = useRef(null);
  
  const emojis = ['🍎', '🍊', '🍇', '🍒', '🍋', '🍉', '🍓', '🍑'];
  const prizeValues = {
    '🍒': 5000, // cherries
    '🍉': 3500, // watermelon
    '🍓': 3000, // strawberry
    '🍎': 2500, // apple
    '🍊': 2000, // orange
    '🍑': 1500, // peach
    '🍋': 1000, // lemon
    '🍇': 500   // grape
  };

  const musicTracks = [
    'the-brotherhood-soundroll-main-version-1814-02-01.mp3',
    'heist-hemlock-main-version-39804-02-38.mp3',
    'groove-sauce-stan-town-main-version-40277-01-56.mp3'
  ];

  useEffect(() => {
    audioRef.current = new Audio(`/music/${musicTracks[currentTrack]}`);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play();
        setIsAudioPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    setIsAudioPlaying(false);
  };

  const spin = () => {
    if (isSpinning || money < 200) return;
    
    setIsSpinning(true);
    setPrizeWon(false);
    setMoney(prev => prev - 200);
    
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
        const winningEmoji = emojis[finalEmojis[0]];
        const prize = prizeValues[winningEmoji];
        setMoney(prev => prev + prize);
        setPrizeWon(true);
        setWinningEmoji(winningEmoji);
        setPrizeAmount(prize);
      }
    }, 2000);
  };

  return (
    <div className="slot-machine">
      <div className="header-section">
        <h2>🎰 Slot Machine 🎰</h2>
        <div className="money-display">
          <span className="money-label">💰 Balance:</span>
          <span className="money-amount">${money.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="audio-controls">
        <button onClick={toggleAudio} className="audio-button">
          {isAudioPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={nextTrack} className="audio-button">
          ⏭️ Next Track
        </button>
        <span className="track-indicator">
          Track {currentTrack + 1} of {musicTracks.length}
        </span>
      </div>
      
      <div className="prize-legend">
        <h3>🎯 Prize Values</h3>
        <div className="legend-grid">
          {Object.entries(prizeValues).map(([emoji, value]) => (
            <div key={emoji} className="legend-item">
              <span className="legend-emoji">{emoji}</span>
              <span className="legend-value">${value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="slot-reels">
        <SlotReel emoji={emojis[slotEmojis[0]]} isSpinning={isSpinning} />
        <SlotReel emoji={emojis[slotEmojis[1]]} isSpinning={isSpinning} />
        <SlotReel emoji={emojis[slotEmojis[2]]} isSpinning={isSpinning} />
      </div>
      
      <div className="spin-section">
        <div className="spin-cost">Each spin costs $200</div>
        <button 
          onClick={spin} 
          disabled={isSpinning || money < 200} 
          className="spin-button"
        >
          {isSpinning ? 'Spinning...' : money < 200 ? 'Not enough money!' : 'Spin!'}
        </button>
      </div>
      
      {prizeWon && <WinMessage winningEmoji={winningEmoji} prizeAmount={prizeAmount} />}
      
      <button onClick={onBackToMenu} className="back-button">
        Back to Menu
      </button>
    </div>
  );
}

export default SlotMachine; 