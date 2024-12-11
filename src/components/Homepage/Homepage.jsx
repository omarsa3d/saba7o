import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Optional: Style the buttons

const Homepage = () => {
  return (
    <div className="home">
      <h1>تحدي السمين</h1>
      <div className="buttons">
        <Link to="/guess">
          <button className="home-button">العب خمن اللاعب</button>
        </Link>
        <Link to="/risk">
          <button className="home-button">العب ريسك</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
