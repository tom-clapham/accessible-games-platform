import React from 'react';
import styles from './Login.module.css';
import {OpenLogin} from './Login';
import Logo from '../assets/platform_logo.jpg';

const Login = () => {
  return (
    <form className={styles.container}>
        <div className={styles.form}>
            <img src={Logo} alt='Platform Logo' className={styles.logo}></img>
            <h1 className={styles.signin}>Sign in</h1>
            <h3 className={styles.subtext}>Use your platform account</h3>
            <div className={styles.elements}>
                <label className={styles.label}>Email or username</label>
                <input className={styles.input} type="email" placeholder="Enter your email or username"></input>
                <label className={styles.forgot}><a>Forgot username or email?</a></label>

                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" placeholder="Enter your password"></input>
                <label className={styles.forgot}><a>Forgot password?</a></label>
            </div>
            <button className={styles.button} type="button" onClick={OpenLogin}>Sign in</button>
            <h3 className={styles.create}>New to us? <a>Create an account</a></h3>
        </div>
    </form>
  )
}

export default Login