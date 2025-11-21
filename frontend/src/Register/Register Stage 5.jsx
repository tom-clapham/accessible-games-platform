<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { addGenre, addAccessibility } from './Register';
import { array_genre, accessibility_array } from './Register';
const Register_Stage_5 = () => {
  const [isGenres, setIsGenres] = useState("");

  const checkGenres = (array) => {
    if(array.length < 3){
        setIsGenres("false");
    } 
  }

  return (
    <div className={styles.container}>
        <form className={styles.form5}>
            <a className={styles.back} onClick={() => {setStage("4")}}>Back</a>
=======
import {useState, useRef} from 'react';
import styles from './Register.module.css';
import Warning from '../assets/warning.png';
import { addGenre } from './Register';
import { array_genre } from './Register';
import { step_5 } from '../endpoints/api.js';
import { useNavigate } from 'react-router-dom';

const Register_Stage_5 = () => {
  const [isGenres, setIsGenres] = useState("");
    const nav = useNavigate()
    const formRef = useRef(null);
    const checkGenres = async (array) => {
        const success = await step_5(array)
        if(success){
            nav('/');
            alert('User created successfully')
        } else {
          setIsGenres("false")
        }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        formRef.current.requestSubmit();
      }
    };

  return (
    <div className={styles.container}>
        <form className={styles.form5}
        ref={formRef}
        onKeyDown={handleKeyDown}
        onSubmit={(e) => {
            e.preventDefault(); 
            checkGenres(array_genre);
        }}>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
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
<<<<<<< HEAD
            <button className={styles.signup} type="submit" onClick={() => {checkGenres(array_genre)}}>Register</button>
=======
            <button className={styles.signup} type="submit">Register</button>
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
        </form>
    </div>
  )
}

export default Register_Stage_5