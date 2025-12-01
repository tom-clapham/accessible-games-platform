import {useState} from 'react';
import styles from './Register.module.css';
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { step_3 } from '../endpoints/api.js';

const Register_Stage_3 = () => {
  const [userExists, setUserExists] = useState("");
  const [isPassword, setIsPassword] = useState("");

  const nav = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const checkPersonal = async (user, password, cPassword, last, first) => {
    const success = await step_3(user, password, cPassword, last, first)
    if(success == true){
        nav('/register/step_4');
    } else if (success == "password") {
        setIsPassword("false")
        setUserExists("true")
    } else if(success =="username"){
        setUserExists("false")
         setIsPassword("true")
    }
  }

  return (
    <div className={styles.container}>
        <form className={styles.form3}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkPersonal(user, password, cPassword, last, first);
        }}>
            <ul className={styles.list}>
                <li className={styles.stage1}>Date of Birth</li>
                <li className={styles.slash1}>/</li>
                <li className={styles.stage2}>Email</li>
                <li className={styles.slash2}>/</li>
                <li style={{textDecoration:'underline'}} className={styles.stage3}><b>Your info</b></li>
                <li className={styles.slash3}><b>/</b></li>
                <li className={styles.stage4}>Accessibility</li>
                <li className={styles.slash4}>/</li>
                <li className={styles.stage5}>Genres</li>
            </ul>
            <h1 className={styles.h1}>Create your account</h1>
            <div className={styles.names}>
                <div className={styles.firstContainer}>
                    <label className={styles.firstL}>First Name</label>
                    <input className={styles.firstI} required maxLength='100' autoFocus type='text' placeholder='Type your first name' onChange={(e) => setFirst(e.target.value)}></input>
                </div>
                <div className={styles.lastContainer}>
                    <label className={styles.lastL}>Last Name</label>
                    <input className={styles.lastI} required maxLength='100' type='text' placeholder='Type your last name' onChange={(e) => setLast(e.target.value)}></input>
                </div>
            </div>

            <label className={styles.userL}>Choose your username</label>
            <input className={styles.userI} required type='text' maxLength='100' placeholder='Type a username' onChange={(e) => setUser(e.target.value)}></input>

            <label className={styles.passwordL}>Choose your password</label>
            <input className={styles.passwordI} required maxLength='100' type='password' placeholder='Type a password' onChange={(e) => setPassword(e.target.value)}></input>

            <label className={styles.passwordL}>Re-type your password</label>
            <input className={styles.passwordI} required maxLength='100' type='password' placeholder='Re-type your password' onChange={(e) => setCPassword(e.target.value)}></input>

            {userExists=="false" &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                This username is already in use.
            </div>
            )}
            {isPassword=="false" &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                    Your passwords must:
                    <ul>
                        <li>Match one another</li>
                        <li>At least 2 numbers</li>
                        <li>A minimum of 8 characters</li>
                    </ul>
            </div>
            )}
            <button className={styles.continue3} type="submit">Continue</button>
        </form>
    </div>
  )
}

export default Register_Stage_3