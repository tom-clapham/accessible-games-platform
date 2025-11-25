export let array_genre = [];
export let accessibility_array = [];

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
    }
}



