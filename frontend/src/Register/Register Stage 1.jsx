<<<<<<< HEAD
import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { useNavigate } from 'react-router-dom'
import { step_1 } from '../endpoints/api.js';

const Register_Stage_1 = () => {
=======
import React, {useState, useEffect} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { useNavigate } from 'react-router-dom'
import { step_1 } from '../endpoints/api';

const Register_Stage_1 = () => {;
    
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
  const nav = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isDate, setIsDate] = useState("");
<<<<<<< HEAD

  const checkDate = async (year, month, day) => {
    const d = new Date(year, month - 1, day);
=======
  const checkDate = async (year, month, day) => {
    const d = new Date(year, month, day);
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
    const isoString = d.toISOString();        
    const dateOnly = isoString.split('T')[0]; 
    const success = await step_1(dateOnly);
    if(success){
<<<<<<< HEAD
        alert("Success!")
    }
    // const d = new Date(year, month - 1, day);
    // if(d.getFullYear() < 2012 && d.getFullYear() > 1940 && d.getMonth() === month - 1 && d.getDate() === day){
    //     setStage("2");
    // } else {
    //     setIsDate("false");
    // }
=======
        nav('/register/step_2');
    } else {
        setIsDate("false")
    }
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
  }

  const handleLogin = () => {
    nav('/login');
  }

  return (
    <div className={styles.container}>
<<<<<<< HEAD
        <form className={styles.form1}>
=======
        <form className={styles.form1}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkDate(Number(year), Number(month), Number(day));
        }}>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
            <h1 className={styles.h1}>Create an account</h1>
            <h3 className={styles.subtext}>Please enter your date of birth. This is to help you have a safe and fun experience no matter your age. </h3>
            <div className={styles.elements}>
                {isDate == "false" &&(<div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                    Please ensure this is your real birthday.
                </div>
                )}
                <label className={styles.dob}>Date of birth</label>
                <div className={styles.dropdown}>
<<<<<<< HEAD
                    <select name="day" className={styles.day} value={day} onChange={(e) => setDay(e.target.value)}>
=======
                    <select className={styles.day} required value={day} onChange={(e) => setDay(e.target.value)}>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>))}
                    </select>
<<<<<<< HEAD
                    <select name="month" className={styles.month} value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option key='month' value='month'>Month</option>
=======
                    <select className={styles.month} required value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="" disabled>Month</option>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
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
<<<<<<< HEAD
                    <input className={styles.year} type='text' placeholder='Year' maxLength='4' onChange={(e) => setYear(e.target.value)}></input>
                </div>
            </div>
            <button className={styles.continue} type="submit" onClick={() => {checkDate(Number(year), Number(month), Number(day))}}>Continue</button>
=======
                    <input className={styles.year} type='text' value={year} placeholder='Year' maxLength='4' onChange={(e) => setYear(e.target.value)}></input>
                </div>
            </div>
            <button className={styles.continue} type="submit">Continue</button>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
            <div className={styles.accountContainer}>
                <h3 className={styles.account}>Already have an account? <a onClick={handleLogin}>Sign in</a></h3>
            </div>
        </form>
    </div>
  )
}

export default Register_Stage_1