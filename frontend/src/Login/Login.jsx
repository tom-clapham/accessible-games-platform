import React from 'react';
import './Login.css';
import {OpenLogin} from './Login';
import Logo from '../assets/platform_logo.jpg';

const Login = () => {
  return (
    <form className='input-container'>
        <div className='form'>
            <img src={Logo} alt='Platform Logo' className='logo-picture'></img>
            <h1>Sign in</h1>
            <h3 className='subtext'>Use your platform account</h3>
            <div className='form-elements'>
                <label>Email or username</label>
                <input type="email" placeholder="Enter your email or username"></input>
                <label className='forgot-text'><a>Forgot username or email?</a></label>

                <label>Password</label>
                <input type="password" placeholder="Enter your password"></input>
                <label className='forgot-text'><a>Forgot password?</a></label>
            </div>
            <button type="button" onClick={OpenLogin}>Sign in</button>
            <h3 className='create-account-text'>New to us? <a>Create an account</a></h3>
        </div>
        
    </form>
  )
}

export default Login