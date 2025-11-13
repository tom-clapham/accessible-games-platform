let array = [];
import deleteIcon from '../assets/delete.png';
import styles from './Register.module.css';

export function addGenre(id){
    const ul = document.getElementById('selectedGenres');
    
    if(!(array.includes(id))){
        array.push(id);
    }

    ul.innerHTML = '';

    array.forEach(item => {
        const li = document.createElement('li');
        const cross = document.createElement('img');
        cross.src = deleteIcon;    
        cross.alt = 'Remove genre';               
        cross.id = item; 
        cross.className = styles.remove;
        li.id = item;
        li.textContent = item;
        li.appendChild(cross);
        ul.appendChild(li);

        cross.addEventListener('click', () => {
            array = array.filter(item => item !== cross.id);
            document.getElementById(cross.id).remove();
        });
    });
}

export function handleLogin(){
    
}

