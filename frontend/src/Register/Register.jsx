import React, {useEffect, useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { addGenre, addAccessibility, saveDob, saveEmail, savePersonalInfo, register } from './Register';
import { useNavigate } from 'react-router-dom';
import { array_genre } from './Register';
import {useAuth} from '../contexts/useAuth.jsx'



const Register = () => {
  const { register_user} = useAuth();
  const [isDate, setIsDate] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [emailExists, setEmailExists] = useState("");
  const [userExists, setUserExists] = useState("");
  const [isGenres, setIsGenres] = useState("");
  const [isBlank, setIsBlank] = useState("");
  const [isUser, setIsUser] = useState("");
  const [isPassword, setIsPassword] = useState("");
  

  const nav = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [stage, setStage] = useState("1");

  const checkDate = (year, month, day) => {
    const d = new Date(year, month - 1, day);
    if(d.getFullYear() < 2012 && d.getFullYear() > 1940 && d.getMonth() === month - 1 && d.getDate() === day){
        saveDob(day, month, year);
        setStage("2");
        setIsDate("true")
    } else {
        setStage("1");
        setIsDate("false");
    }
  }

  const checkEmail = (email) => {
    if (!((email.includes("@gmail.com")) || (email.includes("@icloud.com")) || (email.includes("@hotmail.com")) || (email.includes("@outlook.com")) || (email.includes("@me.com")))){
        setIsEmail("false");
    } else {
        saveEmail(email);
        setStage("3");
        setIsDate("true")
    }
  }

  const checkPersonal = (first, last, user, password, cPassword) => {
    const regex = /(?:.*\d){2,}/;
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

    if (!(first == '' || last == '' || user == '' || password == '') && !(password != cPassword || (!regex.test(password)) || password.length < 8)){
        setStage("4");
        setIsDate("true")
    }
  }

  const checkGenres = (array) => {
    if(array.length < 3){
        setIsGenres("false");
    } else {
        register_user(first, last, user, password, email, (year+'-'+month+'-'+day))
    }
  }

  const handleLogin = () => {
    nav('/login');
  }

  return (
    <form className={styles.container}>
        {stage == '1' && (<div className={styles.form1}>
            <h1 className={styles.h1}>Create an account</h1>
            <h3 className={styles.subtext}>Please enter your date of birth. This is to help you have a safe and fun experience no matter your age. </h3>
            <div className={styles.elements}>
                {isDate == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                    Please ensure this is your real birthday.
                </div>
                )}
                <label className={styles.dob}>Date of birth</label>
                <div className={styles.dropdown}>
                    <select name="day" className={styles.day} value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>))}
                    </select>
                    <select name="month" className={styles.month} value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option key='month' value='month'>Month</option>
                        <option value='01'>Jan</option>
                        <option value='02'>Feb</option>
                        <option value='03'>Mar</option>
                        <option value='04'>Apr</option>
                        <option value='05'>May</option>
                        <option value='06'>Jun</option>
                        <option value='07'>Jul</option>
                        <option value='08'>Aug</option>
                        <option value='09'>Sep</option>
                        <option value='10'>Oct</option>
                        <option value='11'>Nov</option>
                        <option value='12'>Dec</option>
                    </select>
                    <input className={styles.year} type='text' placeholder='Year' maxLength='4' onChange={(e) => setYear(e.target.value)}></input>
                </div>
            </div>
            <button className={styles.continue} type="button" onClick={() => {checkDate(Number(year), Number(month), Number(day))}}>Continue</button>
            <div className={styles.accountContainer}>
                <h3 className={styles.account}>Already have an account? <a onClick={handleLogin}>Sign in</a></h3>
            </div>
        </div>
        )}
        {stage == "2" &&(<div className={styles.form2}>
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
            <button className={styles.continue2} type="button" onClick={() => {checkEmail(email)}}>Continue</button>
            <div className={styles.orContainer}>
                <h3 className={styles.or}>or</h3>
            </div>
        </div>
        )}
        {stage == "3" &&(<div className={styles.form3}>
            <a className={styles.back} onClick={() => {setStage("2"); setEmail("")}}>Back</a>
            <h1 className={styles.h1}>Create your account</h1>
            <label className={styles.emailL}>Email address</label>
            <input className={styles.emailI} type='email' placeholder={email} disabled={true}></input>

            <div className={styles.names}>
                <div className={styles.firstContainer}>
                    <label className={styles.firstL}>First Name</label>
                    <input className={styles.firstI} maxLength='100' type='text' placeholder='Type your first name' onChange={(e) => setFirst(e.target.value)}></input>
                </div>
                <div className={styles.lastContainer}>
                    <label className={styles.lastL}>Last Name</label>
                    <input className={styles.lastI} maxLength='100' type='text' placeholder='Type your last name' onChange={(e) => setLast(e.target.value)}></input>
                </div>
            </div>

            <label className={styles.userL}>Choose your username</label>
            <input className={styles.userI} type='text' maxLength='100' placeholder='Type a username' onChange={(e) => setUser(e.target.value)}></input>

            <label className={styles.passwordL}>Choose your password</label>
            <input className={styles.passwordI} maxLength='100' type='password' placeholder='Type a password' onChange={(e) => setPassword(e.target.value)}></input>

            <label className={styles.passwordL}>Re-type your password</label>
            <input className={styles.passwordI} maxLength='100' type='password' placeholder='Re-type your password' onChange={(e) => setCPassword(e.target.value)}></input>

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
            {isBlank=="false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                Please fill in all the fields.
            </div>
            )}
            <button className={styles.continue3} type="button" onClick={() => {checkPersonal(first, last, user, password, cPassword)}}>Continue</button>
        </div>
        )}
        {stage == "4" &&(<div className={styles.form4}>
            <a className={styles.back} onClick={() => {setStage("3"); setLast(""); setFirst(""); setUser(""); setPassword(""); setCPassword("");}}>Back</a>
            <h1 className={styles.h1}>Your accessibility settings</h1>
            <h3 className={styles.subtext}>Please tick all that apply to you. This is to help us provide you with the best possible experience.</h3>
            <ul className={styles.impairments}>
                <li><button id='Visual' type='button' className={styles.visual} onClick={(e) => addAccessibility(e.target.id, e.target.value)}>Visual Impairments</button></li>
                <li><button id='Dexterity' type='button' className={styles.dexterity} onClick={(e) => addAccessibility(e.target.id, e.target.value)}>Dexterity Impairments</button></li>
                <li><button id='Speech' type='button' className={styles.speech} onClick={(e) => addAccessibility(e.target.id, e.target.value)}>Speech Impairments</button></li>
                <li><button id='Hearing' type='button' className={styles.hearing} onClick={(e) => addAccessibility(e.target.id, e.target.value)}>Hearing Impairments</button></li>
                <li><button id='Cognitive' type='button' className={styles.cognitive} onClick={(e) => addAccessibility(e.target.id, e.target.value)}>Cognitive Impairments</button></li>
            </ul>
            <button className={styles.continue4} type="button" onClick={() => {setStage("5")}}>Continue</button>
        </div>
        )}
        {stage == "5" &&(<div className={styles.form5}>
            <a className={styles.back} onClick={() => {setStage("4")}}>Back</a>
            <h1 className={styles.h1}>Your favourite genres</h1>
            <h3 className={styles.h3}>Select all games genres that you enjoy playing.</h3>
            <ul id='selectedGenres' className={styles.selectedGenres}></ul>
            <ul className={styles.genres}>
                <li><button id='Action' type='button' onClick={(e) => addGenre(e.target.id)}>Action</button></li>
                <li><button id='Adventure' type='button' onClick={(e) => addGenre(e.target.id)}>Adventure</button></li>
                <li><button id='Puzzle' type='button' onClick={(e) => addGenre(e.target.id)}>Puzzle</button></li>
                <li><button id='Simulation' type='button' onClick={(e) => addGenre(e.target.id)}>Simulation</button></li>
                <li><button id='Sport' type='button' onClick={(e) => addGenre(e.target.id)}>Sport</button></li>
                <li><button id='Shooter' type='button' onClick={(e) => addGenre(e.target.id)}>Shooter</button></li>
                <li><button id='RPG' type='button' onClick={(e) => addGenre(e.target.id)}>RPG</button></li>
                <li><button id='Horror' type='button' onClick={(e) => addGenre(e.target.id)}>Horror</button></li>
                <li><button id='Educational' type='button' onClick={(e) => addGenre(e.target.id)}>Educational</button></li>
            </ul>
            {isGenres == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                You must select at least 3 genres.
            </div>
            )}
            <button className={styles.signup} type="button" onClick={() => {checkGenres(array_genre)}}>Register</button>
        </div>
        )}
    </form>
  )
}

export default Register