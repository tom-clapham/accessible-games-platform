import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
<<<<<<< HEAD


const Register_Stage_2 = () => {
  const [isEmail, setIsEmail] = useState("");
  const [emailExists, setEmailExists] = useState("");
  const [email, setEmail] = useState("");
  
  const checkEmail = async (email) => {
    if (!((email.includes("@gmail.com")) || (email.includes("@icloud.com")) || (email.includes("@hotmail.com")) || (email.includes("@outlook.com")) || (email.includes("@me.com")))){
        setIsEmail("false");

    } else {
        const emailAvailable = await user_emails(email);
        if (!emailAvailable){
            setEmailExists("false");
            setIsEmail("true");
        } else {
            setStage("3");
        }
    }
=======
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
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
  }

  return (
    <div className={styles.container}>
<<<<<<< HEAD
        <form className={styles.form2}>
            <a className={styles.back} onClick={() => {setStage("1"); setDay(""); setMonth(""); setYear("")}}>Back</a>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
            {isEmail == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                Please use a real email address.
            </div>
            )}
=======
        <form className={styles.form2}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkEmail(email);
        }}>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' autoFocus required type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
            {emailExists == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                This email address is already in use.
            </div>
            )}
<<<<<<< HEAD
            <button className={styles.continue2} type="submit" onClick={() => {checkEmail(email)}}>Continue</button>
=======
            <button className={styles.continue2} type="submit">Continue</button>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
        </form>
    </div>
  )
}

export default Register_Stage_2