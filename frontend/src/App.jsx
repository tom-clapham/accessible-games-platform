import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import Login from './Login/Login.jsx'
import Register_Stage_1 from './Register/Register Stage 1.jsx'
import Register_Stage_2 from './Register/Register Stage 2.jsx'
import Register_Stage_3 from './Register/Register Stage 3.jsx'
import Register_Stage_4 from './Register/Register Stage 4.jsx'
import Register_Stage_5 from './Register/Register Stage 5.jsx'
import { AuthProvider } from './contexts/useAuth.jsx';
import PrivateRoute from './endpoints/private_routes.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register/step_1" element={<Register_Stage_1/>}/>
            <Route path="/register/step_2" element={<Register_Stage_2/>}/>
            <Route path="/register/step_3" element={<Register_Stage_3/>}/>
            <Route path="/register/step_4" element={<Register_Stage_4/>}/>
            <Route path="/register/step_5" element={<Register_Stage_5/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
