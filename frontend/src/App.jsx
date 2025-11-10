import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import GameProfile from './game_profile/GameProfile.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/gameprofile/:id" element={<GameProfile/>}/>
      </Routes>
    </Router>
  )
}

export default App
