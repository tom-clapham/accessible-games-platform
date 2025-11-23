import {useState, useRef} from 'react';
import styles from './Register.module.css';
import { IoIosWarning } from "react-icons/io";
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
            {isGenres == "false" &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>
                You must select at least 3 genres.
            </div>
            )}
            <button className={styles.signup} type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register_Stage_5