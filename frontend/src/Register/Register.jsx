import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png'


const Register = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  return (
    <form className={styles.container}>
        <div className={styles.form}>
            <h1 className={styles.h1}>Create an account</h1>
            <h3 className={styles.subtext}>Please enter your date of birth. This is to help you have a safe and fun experience no matter your age. </h3>
            <div className={styles.elements}>
                <div className={styles.error}><img src={Warning} alt="Warning Logo" className={styles.warning}/>
                    Please ensure this is your real birthday.
                    </div> 
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
                        <option key='1' value='Jan'>Jan</option>
                        <option key='2' value='Feb'>Feb</option>
                        <option key='3' value='Mar'>Mar</option>
                        <option key='4' value='Apr'>Apr</option>
                        <option key='5' value='May'>May</option>
                        <option key='6' value='Jun'>Jun</option>
                        <option key='7' value='Jul'>Jul</option>
                        <option key='8' value='Aug'>Aug</option>
                        <option key='9' value='Sep'>Sep</option>
                        <option key='10' value='Oct'>Oct</option>
                        <option key='11' value='Nov'>Nov</option>
                        <option key='12' value='Dec'>Dec</option>
                    </select>
                    <input className={styles.year} type='text' placeholder='Year'></input>
                </div>
            </div>
            <button className={styles.continue} type="button">Continue</button>
            <div className={styles.accountContainer}>
                <h3 className={styles.account}>Already have an account? <a>Sign in</a></h3>
            </div>
        </div>
    </form>
  )
}

export default Register