import React from 'react'
import Homepage from './components/Homepage/Homepage.jsx'
import Guess from './components/guessThePlayer/Guess.jsx'
import Risk from './components/Risk/Risk.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/guess" element={<Guess />} />
        <Route path="/risk" element={<Risk />} />
      </Routes>
  </Router>
  )
}

export default App