import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Login from './Login/Login.jsx'
import Register from './Register/Register.jsx'
import { AuthProvider } from './contexts/useAuth.jsx';
import PrivateRoute from './endpoints/private_routes.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
