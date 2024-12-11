import React, { useState, useEffect } from 'react';
import playersData from '../../data/guess.json';
import './Guess.css'

const Guess = () => {
  // TIMER START
  const [timeLeft, setTimeLeft] = useState(45);
  const [isActive, setIsActive] = useState(false);

  // TIMER EFFECT
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop the timer
    }
    return () => clearTimeout(timer); // Cleanup
  }, [isActive, timeLeft]);

  // HANDLER: Toggle Pause/Resume Timer
  const toggleTimer = () => {
    setIsActive((prev) => !prev); // Toggle active state
  };

  // HANDLER: Reset Timer to 45 seconds
  const resetTimer = () => {
    setTimeLeft(45);
    setIsActive(false);
  };
  // TIMER END

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);

  useEffect(() => {
    shufflePlayer();
  }, []);

  const shufflePlayer = () => {
    const randomPlayer =
      playersData[Math.floor(Math.random() * playersData.length)];
    setCurrentPlayer(randomPlayer);
    setRevealedClues([randomPlayer.clue1]); // Start with the first clue
    resetTimer(); // Reset the timer when shuffling
  };

  const showNextClue = () => {
    if (revealedClues.length < 5) {
      setRevealedClues((prevClues) => [
        ...prevClues,
        currentPlayer[`clue${prevClues.length + 1}`],
      ]);
      resetTimer();
    }
  };

  if (!currentPlayer) return <div>Loading...</div>;

  return (
    <div className="guess-container">
      {/* HEADER AND CLUES */}
      <h1>خمن اللاعب</h1>
      <div>
        {revealedClues.map((clue, index) => (
          <p key={index} className='clues'>{clue}</p>
        ))}
      </div>

      {/* BUTTONS */}
      <div>
        <button
          onClick={showNextClue}
          disabled={revealedClues.length >= 5}
        >
          الدليل الجاي
        </button>
        <button onClick={() => alert(`Answer: ${currentPlayer.name}`)}>
          وريني الإجابه
        </button>
        <button onClick={shufflePlayer}>غير اللاعب</button>
      </div>

      {/* Digital Clock */}
      <div
        onClick={toggleTimer}
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          padding: "10px",
          cursor: "pointer",
          background: isActive ? "#006400" : "#1a1a1a", // Green for running, red for paused
          borderRadius: "8px",
          border: '1px solid transparent',
          textAlign: "center",
          maxWidth: "100px",
          margin: "20px auto",
        }}
      >
        {timeLeft}s
      </div>
    </div>
  );
};

export default Guess;
