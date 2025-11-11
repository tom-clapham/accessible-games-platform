import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Discover from './Discover.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/discover" element={<Discover/>}/>
      </Routes>
    </Router>
  )
}

export default App
