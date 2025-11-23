import React, {useState} from 'react';
import styles from './Login.module.css';
import Logo from '../assets/platform_logo.jpg';
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/useAuth.jsx';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const {login_user} = useAuth();
  const nav = useNavigate();

  const handleLogin = async () => {
      const success = await login_user(username, password);
      console.log(success)
      if(!success){
        setError(true);
      }
  }

  const handleRegister = () => {
    setError(false);
    window.close()
    window.opener.location.href = "/register/step_1/";
  }

  const forgot = (value) => {
    nav('/forgot-credentials', {state : {from: value}})
  }

  return (
    <form className={styles.container}
    onSubmit={(e) => {
        e.preventDefault(); 
        handleLogin();
    }}>
        <div className={styles.form}>
            <img src={Logo} alt='Platform Logo' className={styles.logo}></img>
            <h1 className={styles.signin}>Sign in</h1>
            <h3 className={styles.subtext}>Use your platform account</h3>
            <div className={styles.elements}>
                <label className={styles.label}>Username</label>
                <input className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter your username"></input>
                <label  className={styles.forgot}><a id="username" onClick={(e) => forgot(e.target.id)}>Forgot username?</a></label>

                <label className={styles.label}>Password</label>
                <input className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password"></input>
                <label className={styles.forgot}><a id="password" onClick={(e) => forgot(e.target.id)}>Forgot password?</a></label>
            </div>
            {error && (<div className={styles.error}><IoIosWarning className={styles.warning}/>
                  Username or password is incorrect.
              </div> 
            )}
            <button className={styles.button} type="submit">Sign in</button>
            <h3 className={styles.create}>New to us? <a onClick={handleRegister}>Create an account</a></h3> 
        </div>
    </form>
  )
}

export default Login