import React, { useState } from 'react';
import Menu from './components/Menu';
import SlotMachine from './components/SlotMachine';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const handleStartGame = () => {
    setCurrentScreen('slot');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="App">
      {currentScreen === 'menu' ? (
        <Menu onStartGame={handleStartGame} />
      ) : (
        <SlotMachine onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
