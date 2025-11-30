import './SearchBarNav.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
 
function SearchBar(){
  const [userSearch, setUserSearch] = useState(""); // This will be updated with the users latest inputs
  const [results, setResults] = useState([]) // This will contain the name, id and image of the game

  useEffect(() => {
    const name = setTimeout(() => {
      // axios.get("http://localhost:8000/app/games/search")
      // .then(res => console.log(res.data))
      // .catch(err=>{console.log(err)})
      console.log(userSearch)
    }, 200);
    return () => clearTimeout(name);
  }, [userSearch]);

  return (
    <div className='search-container'>
        <input type='text' placeholder='Search apps, games and more...' onChange={(e) => setUserSearch(e.target.value)}/>
        <img src="" alt=""/>
    </div>
  )
}

export default SearchBar;