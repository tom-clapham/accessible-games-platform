import React, {useState} from 'react';
import styles from './Login.module.css';
import {OpenLogin} from './Login';
import Logo from '../assets/platform_logo.jpg';
import {login} from '../endpoints/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async () => {
      login(email, password);
      nav('/');
    }

  return (
    <form className={styles.container}>
        <div className={styles.form}>
            <img src={Logo} alt='Platform Logo' className={styles.logo}></img>
            <h1 className={styles.signin}>Sign in</h1>
            <h3 className={styles.subtext}>Use your platform account</h3>
            <div className={styles.elements}>
                <label className={styles.label}>Email address</label>
                <input className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email"></input>
                <label className={styles.forgot}><a>Forgot email?</a></label>

                <label className={styles.label}>Password</label>
                <input className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password"></input>
                <label className={styles.forgot}><a>Forgot password?</a></label>
            </div>
            <button className={styles.button} type="button" onClick={handleLogin}>Sign in</button>
            <h3 className={styles.create}>New to us? <a>Create an account</a></h3> 
        </div>
    </form>
  )
}

export default Login