import {useState, useEffect} from 'react';
import './Navbar.css';
import logoPicture from '../../assets/platform_logo.jpg';
import SearchBar from '../SearchBars/SearchBarNav.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { CgGames } from "react-icons/cg";
import { user_info, logout } from '../../endpoints/api';
import {OpenLogin} from '../../Login/Login.js';
import logo from '../../assets/platform_logo.jpg';

function Navbar(){
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(false);
  const nav = useNavigate();
  
  useEffect(() => {
      const fetchInfo = async () => {
        const info = await user_info();
        setUser(info);
      }
      fetchInfo();

      const handleMessage = (event) => {
        if (event.data.type === 'LOGIN_SUCCESS') {
          window.location.reload()
          fetchInfo();
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
  }, []);

  function login_redirect(){
      OpenLogin();
  }

  function showHideProfile(){
      if(!profile){
          setProfile(true);
      } else if(profile){
          setProfile(false);
      }
      
  }

  function navHome(){
      nav('/')
  }

  function navAccount(){
    nav("/account", {
      state: { message: true},
    });
  }

  function navGames(){
      nav('/discover')
  }

  function navFavouriteGames(){
    nav('account/', {
      state: { message: 'favourites'},
    })
  }

  function navBrowse(){
      nav('/browse')
  }

  function navPublishers(){
      nav('/publishers')
  }

  const handleLogout = async () => {
      const success = await logout();
      if(success){
          window.location.reload();
      }
  }

  console.log(user)
  
  return (
    <div>
      <div className='navbar'>
        <img className='logo' src={logoPicture} alt='Logo Picture' onClick={navHome}></img>
          <ul className='list'>
            <li className='discover-link' onClick={navGames}>Discover</li>
            <li className='browse-link' onClick={navBrowse}>Browse</li>
            <li className='community-link'>Community</li>
            <li className='publishers-link' onClick={navPublishers}>Publishers</li>
            <li className='about-link'>About us</li>
          </ul>
      
        <SearchBar/>
        <ul className='login'>
          {user ? <li className='user_profile' onClick={showHideProfile}>{user.publisher == null ? user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase() : 
            <img src={`http://localhost:8000${user.publisher.logo}`} className='avatar-img' alt="User logo"/>}
            </li> : <li className='login-link' onClick={login_redirect}>Sign in<MdAccountCircle className='profile_signin'/></li>}
        </ul>
      </div>
      {profile == true &&(
            user.publisher == null ? (
        <div className='profile-popup'>
          <div className='logo-signout'>
            <img className='logo-small' src={logo}></img>
            <a className='signout' onClick={handleLogout}>Sign out</a>
          </div>
          <div className='account-info'>
            <div className='initials-container'> 
              {user ? <div className='initials'>{user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}</div> : <div></div>}
            </div>
            <div>
              <div className='user-info'></div>
              <div className='name'>{user.first_name + ' ' + user.last_name}</div>
              <div className='email'>{user.email}</div>
            </div>
          </div>
          <div className='account' onClick={navAccount}>My account</div>
          <hr className='line'/>
          <div className='favourite-container'>
            <div className='favourite-games' onClick={navFavouriteGames}><CgGames className='games-icon'/>View my favourite games</div>
          </div>
        </div>
      ) : (
        <div className='profile-popup'>
          <div className='logo-signout'>
            <img className='logo-small' src={logo}></img>
            <a className='signout' onClick={handleLogout}>Sign out</a>
          </div>
          <div className='account-info'>
            <div className='avatar-img-profile'>
                {user ? <img src={`http://localhost:8000${user.publisher.logo}`} alt="User logo"/> : <div></div>}
            </div>
            <div>
              <div className='user-info'></div>
              <div className='name'>{user.publisher.name}</div>
              <div className='email'>{user.email}</div>
            </div>
          </div>
          <hr className='line'/>
          <div className='favourite-container'>
            <Link to={`/publisher/${user.publisher.id}`} className='favourite-games'><CgGames className='games-icon'/>View published games</Link>
          </div>
        </div>
      )
      )}
    </div>
  )
}

export default Navbar