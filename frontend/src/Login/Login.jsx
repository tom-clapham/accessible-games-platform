import React, {useState} from 'react';
import styles from './Login.module.css';
import Logo from '../assets/platform_logo.jpg';
import Warning from '../assets/Warning.png';
import {login} from '../endpoints/api';
import {OpenLogin} from './Login.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
      const success = await login(email, password);

      if(success){
        if (window.opener) {
          window.opener.location.href = '/';
        }
        window.close();

      } else {
        setError(true);
        nav('/login');
      }
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
                <label className={styles.forgot}><a onClick={OpenLogin}>Forgot password?</a></label>
            </div>
            {error && (<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                  Username or password is incorrect.
              </div> 
            )}
            <button className={styles.button} type="button" onClick={handleLogin}>Sign in</button>
            <h3 className={styles.create}>New to us? <a>Create an account</a></h3> 
        </div>
    </form>
  )
}

export default Login