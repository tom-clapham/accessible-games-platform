import React, {useState} from 'react';
import styles from './Forgot.module.css';
import Warning from '../assets/warning.png';
import { useLocation } from 'react-router-dom'
import { forgot_info } from '../endpoints/api';


const Forgot_Information = () => {
    const [emailExists, setEmailExists] = useState("true")
    const [email, setEmail] = useState("")
    const location = useLocation();
    const from = location.state?.from;

    const forgot = async (email) => {
        forgot_info(email, from)
    }

    return (
    <div className={styles.container}>
        <form className={styles.form}
        onSubmit={(e) => {
            forgot(email)
            e.preventDefault(); 
        }}>
            <h1 className={styles.h1}>{from == "username" ? "Forgot username" : from == "password" ? "Forgot password" : ""}</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' autoFocus required type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
            {emailExists == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                This email does not exist.
            </div>
            )}
            <button className={styles.continue2} type="submit">{from == "username" ? "Send me my username" : from == "password" ? "Reset my password" : ""}</button>
        </form>
    </div>
    )
}

export default Forgot_Information