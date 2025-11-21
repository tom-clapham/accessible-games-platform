import React, {useEffect, useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
<<<<<<< HEAD
import { addGenre, addAccessibility } from './Register';
import { useNavigate } from 'react-router-dom';
import { array_genre, accessibility_array } from './Register';
import {useAuth} from '../contexts/useAuth.jsx'
import { step_1 } from '../endpoints/api.js';

const Register_Stage_3 = () => {
  const [userExists, setUserExists] = useState("");
  const [isBlank, setIsBlank] = useState("");
  const [isPassword, setIsPassword] = useState("");
  
=======
import { useNavigate } from 'react-router-dom';
import { step_3 } from '../endpoints/api.js';

const Register_Stage_3 = () => {
  const [userExists, setUserExists] = useState("");
  const [isPassword, setIsPassword] = useState("");
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc

  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
<<<<<<< HEAD
  const [stage, setStage] = useState("1");

  const checkPersonal = async (first, last, user, password, cPassword) => {
    const regex = /(?:.*\d){2,}/;
    const userAvailable = await user_usernames(user);

    if(first == '' || last == '' || user == '' || password == ''){
        setIsBlank("false");
        setIsPassword("true");
    }
    if (password != cPassword || (!regex.test(password)) || password.length < 8){
        setIsPassword("false");
        setIsBlank("true");
    }

    if ((first == '' || last == '' || user == '' || password == '') && (password != cPassword || (!regex.test(password)) || password.length < 8)) {
        setIsBlank("false");
        setIsPassword("false");
    }

    if (!userAvailable) {
        setUserExists("false");
    }
    
    if (!(first == '' || last == '' || user == '' || password == '') && !(password != cPassword || (!regex.test(password)) || password.length < 8)){
        setStage("4");
=======

  const checkPersonal = async (user, password, cPassword, last, first) => {
    const success = await step_3(user, password, cPassword, last, first)
    if(success == true){
        nav('/register/step_4');
    } else if (success == "password") {
        setIsPassword("false")
    } else if(success =="username"){
        setUserExists("false")
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
    }
  }

  return (
    <div className={styles.container}>
<<<<<<< HEAD
        <form className={styles.form3}>
            <a className={styles.back} onClick={() => {setStage("2"); setEmail("")}}>Back</a>
            <h1 className={styles.h1}>Create your account</h1>
            <label className={styles.emailL}>Email address</label>
            <input className={styles.emailI} type='email' placeholder={email} disabled={true}></input>
=======
        <form className={styles.form3}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkPersonal(user, password, cPassword, last, first);
        }}>
            <h1 className={styles.h1}>Create your account</h1>
            <label className={styles.emailL}>Email address</label>
            <input className={styles.emailI} required type='email' placeholder={email} disabled={true}></input>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc

            <div className={styles.names}>
                <div className={styles.firstContainer}>
                    <label className={styles.firstL}>First Name</label>
<<<<<<< HEAD
                    <input className={styles.firstI} maxLength='100' type='text' placeholder='Type your first name' onChange={(e) => setFirst(e.target.value)}></input>
                </div>
                <div className={styles.lastContainer}>
                    <label className={styles.lastL}>Last Name</label>
                    <input className={styles.lastI} maxLength='100' type='text' placeholder='Type your last name' onChange={(e) => setLast(e.target.value)}></input>
=======
                    <input className={styles.firstI} required maxLength='100' autoFocus type='text' placeholder='Type your first name' onChange={(e) => setFirst(e.target.value)}></input>
                </div>
                <div className={styles.lastContainer}>
                    <label className={styles.lastL}>Last Name</label>
                    <input className={styles.lastI} required maxLength='100' type='text' placeholder='Type your last name' onChange={(e) => setLast(e.target.value)}></input>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
                </div>
            </div>

            <label className={styles.userL}>Choose your username</label>
<<<<<<< HEAD
            <input className={styles.userI} type='text' maxLength='100' placeholder='Type a username' onChange={(e) => setUser(e.target.value)}></input>

            <label className={styles.passwordL}>Choose your password</label>
            <input className={styles.passwordI} maxLength='100' type='password' placeholder='Type a password' onChange={(e) => setPassword(e.target.value)}></input>

            <label className={styles.passwordL}>Re-type your password</label>
            <input className={styles.passwordI} maxLength='100' type='password' placeholder='Re-type your password' onChange={(e) => setCPassword(e.target.value)}></input>
=======
            <input className={styles.userI} required type='text' maxLength='100' placeholder='Type a username' onChange={(e) => setUser(e.target.value)}></input>

            <label className={styles.passwordL}>Choose your password</label>
            <input className={styles.passwordI} required maxLength='100' type='password' placeholder='Type a password' onChange={(e) => setPassword(e.target.value)}></input>

            <label className={styles.passwordL}>Re-type your password</label>
            <input className={styles.passwordI} required maxLength='100' type='password' placeholder='Re-type your password' onChange={(e) => setCPassword(e.target.value)}></input>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc

            {userExists=="false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                This username is already in use.
            </div>
            )}
            {isPassword=="false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
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
<<<<<<< HEAD
            {isBlank=="false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                Please fill in all the fields.
            </div>
            )}
            <button className={styles.continue3} type="submit" onClick={() => {checkPersonal(first, last, user, password, cPassword)}}>Continue</button>
=======
            <button className={styles.continue3} type="submit">Continue</button>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
        </form>
    </div>
  )
}

export default Register_Stage_3