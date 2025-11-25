import {useState} from 'react';
import styles from './Register.module.css';
import { IoIosWarning } from "react-icons/io";
import { step_2 } from '../endpoints/api';
import { useNavigate } from 'react-router-dom'


const Register_Stage_2 = () => {
  const [emailExists, setEmailExists] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  
  const checkEmail = async (email) => {
    const success = await step_2(email);
        if(success){
            nav('/register/step_3');
        } else {
            setEmailExists("false")
        }
  }

  return (
    <div className={styles.container}>
        <form className={styles.form2}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkEmail(email);
        }}>
            <ul className={styles.list}>
                <li className={styles.stage1}>Date of Birth</li>
                <li className={styles.slash1}>/</li>
                <li style={{textDecoration:'underline'}} className={styles.stage2}><b>Email</b></li>
                <li className={styles.slash2}><b>/</b></li>
                <li className={styles.stage3}>Your info</li>
                <li className={styles.slash3}>/</li>
                <li className={styles.stage4}>Accessibility</li>
                <li className={styles.slash4}>/</li>
                <li className={styles.stage5}>Genres</li>
            </ul>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' autoFocus required type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
            {emailExists == "false" &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                This email address is already in use.
            </div>
            )}
            <button className={styles.continue2} type="submit">Continue</button>
        </form>
    </div>
  )
}

export default Register_Stage_2