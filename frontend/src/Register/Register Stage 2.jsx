import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
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
            <a className={styles.back} onClick={() => {setStage("1"); setDay(""); setMonth(""); setYear("")}}>Back</a>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' required type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
            {emailExists == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                This email address is already in use.
            </div>
            )}
            <button className={styles.continue2} type="submit">Continue</button>
        </form>
    </div>
  )
}

export default Register_Stage_2