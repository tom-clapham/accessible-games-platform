import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';


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
  }

  return (
    <div className={styles.container}>
        <form className={styles.form2}>
            <a className={styles.back} onClick={() => {setStage("1"); setDay(""); setMonth(""); setYear("")}}>Back</a>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} maxLength='100' type='email' placeholder='Type your email address' onChange={(e) => setEmail(e.target.value)}></input>
            {isEmail == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                Please use a real email address.
            </div>
            )}
            {emailExists == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                This email address is already in use.
            </div>
            )}
            <button className={styles.continue2} type="submit" onClick={() => {checkEmail(email)}}>Continue</button>
        </form>
    </div>
  )
}

export default Register_Stage_2