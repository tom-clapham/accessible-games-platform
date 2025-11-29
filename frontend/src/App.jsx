import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home.jsx'
import PrivateRoute from './endpoints/private_routes.jsx'
import Login from './Login/Login.jsx'
import LayoutWithNav from "./Components/LayoutWithNav";
import Register_Stage_1 from './Register/Register Stage 1.jsx'
import Register_Stage_2 from './Register/Register Stage 2.jsx'
import Register_Stage_3 from './Register/Register Stage 3.jsx'
import Register_Stage_4 from './Register/Register Stage 4.jsx'
import Register_Stage_5 from './Register/Register Stage 5.jsx'
import { AuthProvider } from './contexts/useAuth.jsx';
import Forgot_Information from './Forgot/Forgot Information.jsx'
import Reset_Password from './Forgot/Reset Password.jsx'
import GameProfile from './game_profile/GameProfile.jsx'
import Discover from './discover/Discover.jsx'
import Reviews from './Threads/Reviews.jsx'
import AboutUs from './about-us/AboutUs.jsx'
import HelpPage from './help_page/HelpPage.jsx'
import Replies from './Threads/Replies.jsx'
import BrowsePage from './browse/BrowsePage.jsx'
import Account from './Account/Account.jsx'
import Report from './report/Report.jsx'
import PostsReport from './report/PostsReport.jsx'
import VoiceController from './voice_navigation/VoiceController.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
        <VoiceController />

        <Routes>
          <Route element={<LayoutWithNav/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/register/step_1" element={<Register_Stage_1/>}/>
            <Route path="/register/step_2" element={<Register_Stage_2/>}/>
            <Route path="/register/step_3" element={<Register_Stage_3/>}/>
            <Route path="/register/step_4" element={<Register_Stage_4/>}/>
            <Route path="/register/step_5" element={<Register_Stage_5/>}/>
            <Route path="/replies/:reviewId" element={<Replies/>}/>
            <Route path="/reviews/:reviewId" element={<Reviews/>}/>
            <Route path="/gameprofile/:id" element={<GameProfile/>}/>
            <Route path="/discover" element={<Discover/>}/>
            <Route path="/browse" element={<BrowsePage/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/help-page" element={<HelpPage/>}/>
            <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>
            <Route path="/report/game/:gameId" element={<Report/>}/>
            <Route path="/report/post/:postId" element={<PostsReport/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-credentials" element={<Forgot_Information/>}/>
          <Route path="/reset-password" element={<Reset_Password/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
