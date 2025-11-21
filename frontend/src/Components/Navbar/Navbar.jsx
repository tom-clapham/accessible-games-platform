import {useState, useEffect} from 'react';
import './Navbar.css';
import logoPicture from '../../assets/platform_logo.jpg';
import SearchBar from '../SearchBar';'./Components/SearchBar';
import {useAuth} from '../../contexts/useAuth'
import { MdAccountCircle } from "react-icons/md";
import { user_info } from '../../endpoints/api';
import { useNavigate} from 'react-router-dom';
import {OpenLogin} from '../../Login/Login.js';
import logo from '../../assets/platform_logo.jpg';

function Navbar(){
  const {isAuthenticated} = useAuth();
  const [user, setUser] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === 'LOGIN_SUCCESS') {
            const fetchInfo = async () => {
              const info = await user_info();
              setUser(info);
            }
            fetchInfo();
          };
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
}, []);

  function login_redirect(){
      OpenLogin();
  }
  
  return (
    <div>
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
          {user ? <li className='user_profile'>{user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}
            </li> : <li className='login-link' onClick={login_redirect}>Sign in<MdAccountCircle className='profile_signin'/></li>}
        </ul>
      </div>
      <div className='profile-popup'>
        <div className='logo-signout'>
          <img className='logo-small' src={logo}></img>
          <a className='signout'>Sign out</a>
        </div>
        <div className='account-info'>
          {user ? <div className='initials'>{user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}</div> : <div></div>}
        <div>
          <div className='email'>{user.email}</div>
          <div className='name'>{user.first_name + ' ' + user.last_name}</div>
          <div className='account'>My account</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar