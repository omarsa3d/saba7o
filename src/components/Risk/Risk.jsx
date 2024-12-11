import React, { useState } from 'react';
import './Risk.css'; // Assuming you have the CSS file in the same directory
import categoriesData from '../../data/risk.json'; 

const Risk = () => {
  const [categories, setCategories] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [redTeamScore, setRedTeamScore] = useState(0);
  const [blueTeamScore, setBlueTeamScore] = useState(0);
  const [disabledQuestions, setDisabledQuestions] = useState(new Set());

  const shuffleCategories = () => {
    const shuffled = categoriesData.sort(() => 0.5 - Math.random()).slice(0, 4);
    setCategories(shuffled);
    setDisabledQuestions(new Set()); // Reset disabled questions
  };

  const handleQuestionClick = (categoryIndex, points) => {
    const questionKey = `${categoryIndex}-${points}`;
    if (disabledQuestions.has(questionKey)) return;

    const question = categories[categoryIndex][`${points}Points`];
    setSelectedQuestion({ categoryIndex, points, question });
  };

  const handleAddPoints = (team) => {
    if (!selectedQuestion) return;

    const { categoryIndex, points } = selectedQuestion;
    const questionKey = `${categoryIndex}-${points}`;
    const updatedDisabledQuestions = new Set(disabledQuestions);
    updatedDisabledQuestions.add(questionKey);

    setDisabledQuestions(updatedDisabledQuestions);

    if (team === 'red') {
      setRedTeamScore((prev) => prev + points);
    } else if (team === 'blue') {
      setBlueTeamScore((prev) => prev + points);
    }

    setSelectedQuestion(null); // Close the modal
  };

  const handleCloseModal = () => {
    if (!selectedQuestion) return;
  
    const { categoryIndex, points } = selectedQuestion;
    const questionKey = `${categoryIndex}-${points}`;
    const updatedDisabledQuestions = new Set(disabledQuestions);
    updatedDisabledQuestions.add(questionKey);
  
    setDisabledQuestions(updatedDisabledQuestions);
    setSelectedQuestion(null); // Close the modal
  };

  return (
    <div className="risk-game">
      <button className="shuffle-btn" onClick={shuffleCategories}>
        جيم جديد
      </button>

      <table className="game-table">
        <thead>
          <tr>
            {categories.map((category, index) => (
              <th key={index}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[5, 10, 20, 40].map((points) => (
            <tr key={points}>
              {categories.map((_, index) => {
                const questionKey = `${index}-${points}`;
                return (
                  <td key={index}>
                    <button
                      className="question-card"
                      onClick={() => handleQuestionClick(index, points)}
                      disabled={disabledQuestions.has(questionKey)}
                    >
                      {points} نقطه
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="scores">
        <div>الفريق الأول: {redTeamScore}</div>
        <div>الفريق التاني: {blueTeamScore}</div>
      </div>

      {selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedQuestion.points} Points</h2>
            <p>{selectedQuestion.question}</p>
            <button onClick={() => handleAddPoints('blue')}>الفريق التاني</button>
            <button onClick={() => handleAddPoints('red')}>الفريق الأول</button>
            <button onClick={handleCloseModal}>محدش جاوب</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Risk;
