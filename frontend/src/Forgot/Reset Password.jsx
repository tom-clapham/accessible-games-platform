import React, {useState} from 'react';
import styles from './Reset.module.css';
import Logo from '../assets/platform_logo.jpg';
import { IoIosWarning } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';
import { password_reset } from '../endpoints/api';

const Reset_Password = () => {

    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const email = searchParams.get('uid');

    const [isPassword, setIsPassword] = useState(true);
    const [match, setMatch] = useState(true);
    const [success, setSuccess] = useState(false)
    
    const sendPassword = async (password, newPassword, email) => {
        const success = await password_reset(password, newPassword, email);
        if(success == "match"){
            setMatch(false)
            setSuccess(false)
            setIsPassword(true)
        } else if(success == "invalid"){
            setIsPassword(false)
            setSuccess(false)
            setMatch(true)
        } else {
            setMatch(true)
            setIsPassword(true)
            setSuccess(true)
        }
    }
    

  return (
    <form className={styles.container}
    onSubmit={(e) => {
        sendPassword(password, newPassword, email)
        e.preventDefault(); 
        handleLogin();
    }}>
        <div className={styles.form}>
            {/* <img src={Logo} alt='Platform Logo' className={styles.logo}></img> */}
            <h1 className={styles.signin}>Reset your password</h1>
            <h3 className={styles.subtext}>{email}</h3>
            <div className={styles.elements}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your new password"></input>

                <label className={styles.label}>Confirm New Password</label>
                <input className={styles.input} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" placeholder="Re-enter your new password"></input>
            </div>
            {success &&(<div className={styles.success}>
                  Your password has been successfully changed! You can now safely close this tab.
            </div> 
            )}
            {!match &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                  Passwords do not match.
            </div> 
            )}
            {!isPassword &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
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
        </div>
    </form>
  )
}

export default Reset_Password