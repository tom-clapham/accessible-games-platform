import React, {useState} from 'react';
import styles from './Forgot.module.css';
import { IoIosWarning } from "react-icons/io";
import { useLocation } from 'react-router-dom'
import { forgot_info } from '../endpoints/api';


const Forgot_Information = () => {
    const [emailExists, setEmailExists] = useState("true")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const location = useLocation();
    const from = location.state?.from;

    const forgot = async (email) => {
        const success = await forgot_info(email, from)
        if(!success){
            setEmailExists("false")
            setSuccess(false)
        } else {
            setEmailExists("true")
            setSuccess(true)
            
        }
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
            {emailExists == "false" &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                This email does not exist.
            </div>
            )}
            {success &&(<div className={styles.success}>
                {from == "username" ? "An email has been sent to you containing your username." : 
                from == "password" ? "An email has been sent to you with a link to reset your password." : ""}
            </div>
            )}
            <button className={styles.continue2} type="submit">{from == "username" ? "Send me my username" : from == "password" ? "Reset my password" : ""}</button>
        </form>
    </div>
    )
}

export default Forgot_Information