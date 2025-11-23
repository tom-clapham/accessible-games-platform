import React, {useState} from 'react';
import styles from './Reset.module.css';
import Logo from '../assets/platform_logo.jpg';
import Warning from '../assets/Warning.png';
import { useSearchParams } from 'react-router-dom';

const Reset_Password = () => {

    const [searchParams] = useSearchParams();
    const [isPassword, setIsPassword] = useState(true);
    const [match, setMatch] = useState(true);
    const email = searchParams.get('uid');

  return (
    <form className={styles.container}
    onSubmit={(e) => {
        e.preventDefault(); 
        handleLogin();
    }}>
        <div className={styles.form}>
            {/* <img src={Logo} alt='Platform Logo' className={styles.logo}></img> */}
            <h1 className={styles.signin}>Reset your password</h1>
            <h3 className={styles.subtext}>{email}</h3>
            <div className={styles.elements}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} placeholder="Enter your new password"></input>

                <label className={styles.label}>Confirm New Password</label>
                <input className={styles.input} type="password" placeholder="Re-enter your new password"></input>
            </div>
            {!match &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                  Passwords do not match.
            </div> 
            )}
            {!isPassword &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                            <div>
                                Your password must contain:
                                <ul>
                                    <li>A minimum of 8 characters</li>
                                    <li>At least 2 numbers</li>
                                    <li>One upper case character</li>
                                </ul>
                            </div>
                        </div>
                        )}
            <button className={styles.button} type="submit">Change password</button>
            <h3 className={styles.create}>Access your account: <a>Sign in</a></h3> 
        </div>
    </form>
  )
}

export default Reset_Password