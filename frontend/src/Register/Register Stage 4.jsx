import styles from './Register.module.css';
import { addAccessibility } from './Register';
import { useNavigate } from 'react-router-dom';
import { accessibility_array } from './Register';
import { step_4 } from '../endpoints/api.js';
import { useRef } from 'react';



const Register_Stage_4 = () => {
  const nav = useNavigate()
  const formRef = useRef(null);
  const checkAccessibility = async (accessibility_array) => {
    const success = await step_4(accessibility_array)
    if(success){
        nav('/register/step_5');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className={styles.container}>
        <form className={styles.form4}
        ref={formRef}
        onKeyDown={handleKeyDown}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkAccessibility(accessibility_array);
        }}>
          <ul className={styles.list}>
                <li className={styles.stage1}>Date of Birth</li>
                <li className={styles.slash1}>/</li>
                <li className={styles.stage2}>Email</li>
                <li className={styles.slash2}>/</li>
                <li className={styles.stage3}>Your info</li>
                <li className={styles.slash3}>/</li>
                <li style={{textDecoration:'underline'}} className={styles.stage4}><b>Accessibility</b></li>
                <li className={styles.slash4}><b>/</b></li>
                <li className={styles.stage5}>Genres</li>
            </ul>
            <h1 className={styles.h1}>Your accessibility settings</h1>
            <h3 className={styles.subtext}>Please tick all that apply to you. This is to help us provide you with the best possible experience.</h3>
            <ul className={styles.impairments}>
                <li><button id='Visual' type='button' className={styles.visual} onClick={(e) => addAccessibility(e.target.id)}>Visual Impairments</button></li>
                <li><button id='Dexterity' type='button' className={styles.dexterity} onClick={(e) => addAccessibility(e.target.id)}>Dexterity Impairments</button></li>
                <li><button id='Speech' type='button' className={styles.speech} onClick={(e) => addAccessibility(e.target.id)}>Speech Impairments</button></li>
                <li><button id='Hearing' type='button' className={styles.hearing} onClick={(e) => addAccessibility(e.target.id)}>Hearing Impairments</button></li>
                <li><button id='Cognitive' type='button' className={styles.cognitive} onClick={(e) => addAccessibility(e.target.id)}>Cognitive Impairments</button></li>
            </ul>
            <button className={styles.continue4} type="submit">Continue</button>
        </form>
    </div>
  )
}

export default Register_Stage_4