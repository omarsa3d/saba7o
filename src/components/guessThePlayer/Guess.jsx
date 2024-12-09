import React, { useState, useEffect } from 'react';
import playersData from '../../data/guess.json';
import './Guess.css'

const Guess = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [revealedClues, setRevealedClues] = useState([]);

  useEffect(() => {
    shufflePlayer();
  }, []);

  const shufflePlayer = () => {
    const randomPlayer = playersData[Math.floor(Math.random() * playersData.length)];
    setCurrentPlayer(randomPlayer);
    setRevealedClues([randomPlayer.clue1]); // Start with the first clue
  };

  const showNextClue = () => {
    if (revealedClues.length < 5) {
      setRevealedClues((prevClues) => [
        ...prevClues,
        currentPlayer[`clue${prevClues.length + 1}`],
      ]);
    }
  };

  if (!currentPlayer) return <div>Loading...</div>;

  return (
    <div className='guess-container'>
      <h1>Guess the Player</h1>
      <div>
          {revealedClues.map((clue, index) => (
            <p key={index}>{clue}</p>
          ))}
        </div>
        <div>
        <button onClick={showNextClue} disabled={revealedClues.length >= 5}>
          Next Clue
        </button>
        <button onClick={() => alert(`Answer: ${currentPlayer.name}`)}>
          Show Answer
        </button>
        <button onClick={shufflePlayer}>Shuffle</button>
      </div>
    </div>
  );
};

export default Guess;
