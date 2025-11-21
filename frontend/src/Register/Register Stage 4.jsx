<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { addGenre, addAccessibility } from './Register';
import { useNavigate } from 'react-router-dom';
import { array_genre, accessibility_array } from './Register';
import {useAuth} from '../contexts/useAuth.jsx'
import { step_1 } from '../endpoints/api.js';

const Register_Stage_4 = () => {
  return (
    <div className={styles.container}>
        <form className={styles.form4}>
            <a className={styles.back} onClick={() => {setStage("3"); setLast(""); setFirst(""); setUser(""); setPassword(""); setCPassword("");}}>Back</a>
=======
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
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
            <h1 className={styles.h1}>Your accessibility settings</h1>
            <h3 className={styles.subtext}>Please tick all that apply to you. This is to help us provide you with the best possible experience.</h3>
            <ul className={styles.impairments}>
                <li><button id='Visual' type='button' className={styles.visual} onClick={(e) => addAccessibility(e.target.id)}>Visual Impairments</button></li>
                <li><button id='Dexterity' type='button' className={styles.dexterity} onClick={(e) => addAccessibility(e.target.id)}>Dexterity Impairments</button></li>
                <li><button id='Speech' type='button' className={styles.speech} onClick={(e) => addAccessibility(e.target.id)}>Speech Impairments</button></li>
                <li><button id='Hearing' type='button' className={styles.hearing} onClick={(e) => addAccessibility(e.target.id)}>Hearing Impairments</button></li>
                <li><button id='Cognitive' type='button' className={styles.cognitive} onClick={(e) => addAccessibility(e.target.id)}>Cognitive Impairments</button></li>
            </ul>
<<<<<<< HEAD
            <button className={styles.continue4} type="submit" onClick={() => {setStage("5")}}>Continue</button>
=======
            <button className={styles.continue4} type="submit">Continue</button>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
        </form>
    </div>
  )
}

export default Register_Stage_4