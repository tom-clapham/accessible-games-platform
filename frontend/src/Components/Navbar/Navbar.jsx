import React from 'react';
import './Navbar.css';
import logoPicture from '../../assets/platform_logo.jpg';
import SearchBar from '../SearchBar';'./Components/SearchBar';

function Navbar(){
  return (
    <div className='navbar'>
      <img className='logo' src={logoPicture} alt='Logo Picture'></img>
        
        <ul className='list'>
          <li className='home-link'>Home</li>
          <li className='games-link'>Games</li>
          <li className='community-link'>Community</li>
          <li className='about-link'>About us</li>
        </ul>
    
      <SearchBar/>
      <ul className='login'>
        <li className='login-link'>Sign in</li>
      </ul>
    </div>
  )
}

export default Navbar