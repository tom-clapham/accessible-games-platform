import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import GameProfile from './game_profile/GameProfile.jsx'
import Discover from './discover/Discover.jsx'
import Reviews from './Threads/Reviews.jsx'
import Replies from './Threads/Replies.jsx'
import BrowsePage from './browse/BrowsePage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/replies/:reviewId" element={<Replies/>}/>
        <Route path="/reviews/:reviewId" element={<Reviews/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/gameprofile/:id" element={<GameProfile/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/browse" element={<BrowsePage/>}/>
      </Routes>
    </Router>
  )
}

export default App
