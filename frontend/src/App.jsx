import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import GameProfile from './game_profile/GameProfile.jsx'
import Discover from './discover/Discover.jsx'
import Reviews from './Threads/Reviews.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reviews" element={<Reviews id={1}/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/gameprofile/:id" element={<GameProfile/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
    </Router>
  )
}

export default App
