import React from 'react';
import './SlotReel.css';

function SlotReel({ emoji, isSpinning }) {
  return (
    <div className={`slot-reel ${isSpinning ? 'spinning' : ''}`}>
      <div className="slot-content">
        {emoji}
      </div>
    </div>
  );
}

export default SlotReel; 