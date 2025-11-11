import React, {useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png'


const Register = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  return (
    <form className={styles.container}>
        <div className={styles.form1}>
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
        <div className={styles.form2}>
            <a className={styles.back}>Back</a>
            <h1 className={styles.h1}>What's your email?</h1>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.email} type='email' placeholder='Type your email address'></input>
            <button className={styles.continue} type="button">Continue</button>
            <div className={styles.orContainer}>
                <h3 className={styles.or}>or</h3>
            </div>
        </div>
        <div className={styles.form3}>
            <a className={styles.back}>Back</a>
            <h1 className={styles.h1}>Create your account</h1>
            <label className={styles.emailL}>Email address</label>
            <input className={styles.emailI} type='email' placeholder='Type your email address'></input>

            <div className={styles.names}>
                <div className={styles.firstContainer}>
                    <label className={styles.firstL}>First Name</label>
                    <input className={styles.firstI} type='text' placeholder='Type your first name'></input>
                </div>
                <div className={styles.lastContainer}>
                    <label className={styles.lastL}>Last Name</label>
                    <input className={styles.lastI} type='text' placeholder='Type your last name'></input>
                </div>
            </div>

            <label className={styles.userL}>Choose your username</label>
            <input className={styles.userI} type='text' placeholder='Type a username'></input>

            <label className={styles.passwordL}>Choose your password</label>
            <input className={styles.passwordI} type='password' placeholder='Type a password'></input>

            <label className={styles.passwordL}>Re-type your password</label>
            <input className={styles.passwordI} type='password' placeholder='Re-type your password'></input>

            <button className={styles.continue3} type="button">Continue</button>
        </div>
    </form>
  )
}

export default Register