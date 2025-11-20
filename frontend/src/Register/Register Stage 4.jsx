import styles from './Register.module.css';
import { addAccessibility } from './Register';
import { useNavigate } from 'react-router-dom';
import { accessibility_array } from './Register';
import { step_4 } from '../endpoints/api.js';



const Register_Stage_4 = () => {
  const nav = useNavigate()
  const checkAccessibility = async (accessibility_array) => {
    const success = await step_4(accessibility_array)
    if(success){
        nav('/register/step_5');
    }
  }

  return (
    <div className={styles.container}>
        <form className={styles.form4}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkAccessibility(accessibility_array);
        }}>
            <a className={styles.back} onClick={() => {setStage("3"); setLast(""); setFirst(""); setUser(""); setPassword(""); setCPassword("");}}>Back</a>
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