export let array_genre = [];
let accessibility_array = [];
let date;
let email_address;
let username;
let first_name;
let last_name;
let user_password;

export function saveDob(day, month, year){
    date = year + '-' + month + '-' + day;
}

export function saveEmail(email){
    email_address = email;
}

export function savePersonalInfo(first, last, user, password){
    first_name = first;
    last_name = last;
    username = user;
    user_password = password;
}

export function addGenre(id){
    const btn = document.getElementById(id);
    
    if(!(array_genre.includes(id))){
        array_genre.push(id);
        btn.style.backgroundColor = '#919090';
        btn.style.border = '2px solid black';
    } else {
        array_genre = array_genre.filter(item => item !== id);
        btn.style.backgroundColor = '#d7d7d7';
        btn.style.border = '1px solid black';
        btn.addEventListener('mouseover', () => {
            btn.style.backgroundColor = '#919090';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.backgroundColor = '#d7d7d7';
        });
    }
}

export function addAccessibility(id){
    const btn = document.getElementById(id);
    
    if(!(accessibility_array.includes(id))){
        accessibility_array.push(id);
        btn.style.backgroundColor = '#919090';
        btn.style.border = '2px solid black';
    } else {
        accessibility_array = accessibility_array.filter(item => item !== id);;
        btn.style.backgroundColor = '#d7d7d7';
        btn.style.border = '1px solid black';
        btn.addEventListener('mouseover', () => {
            btn.style.backgroundColor = '#919090';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.backgroundColor = '#d7d7d7';
        });
    }
    
}

export function register(){
    console.log(email_address);
    console.log(first_name);
    console.log(last_name);
    console.log(username);
    console.log(user_password);
    console.log(array_genre);
    console.log(accessibility_array);
}



