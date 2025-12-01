import './SearchBarNav.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameTag from '../../game_profile/GameTag';
 
function SearchBar(){
  const [userSearch, setUserSearch] = useState(""); // This will be updated with the users latest inputs
  const [games, setGames] = useState([]) // This is a list of dicts of games
  const free = new RegExp("^(?:[0]+?(?:\\.|\\,)?0*?)?$");
  const navigate = useNavigate();

  useEffect(() => {
    const name = setTimeout(() => {
      axios.get("http://localhost:8000/app/games/search", {params: {"name": userSearch}})
      .then(res => {
        setGames(res.data)})
      .catch(err=>{console.log(err)})
      console.log(userSearch)
    }, 200);
    return () => clearTimeout(name);
  }, [userSearch]);

  

  useEffect(() => {
    console.log(games);
  }, [games]);

  return (
    <>
    <div className='search-container'>
      <input type='text' className='search-input' placeholder='Search apps, games and more...' onChange={(e) => setUserSearch(e.target.value)} value={userSearch}/>
      <div className='information'>{games.length > 0 ? games.map((game, idx) => (
        <>
        <div className='search-item' key={idx} onMouseDown={(e) => e.preventDefault()} onClick={() => {
            navigate(`/gameprofile/${game.profile}`)
            window.location.reload()}}>
          <img 
                src={game.thumbnail_url}
                alt={`${game.name} cover`}
                loading="lazy"
                className="search-item-img"
            />
          <div className='name-price-area'>
            <div className='search-item-name'>{game.name}</div>
            <div className='search-item-price'>{free.test(game.price) ? 'Free' : `£${game.price}`}</div>
          </div>
          <div className='accessiblity-area'>
            <h5 className='accessiblity-label'>Accessibilty:</h5>
            <div className='tags'>
              {game.accessiblity_tags?.map((name) => (
                <div className='single-tag'>{name}</div>
              ))}
          </div>
          </div>
          <div className='accessiblity-area'>
            <h5 className='accessiblity-label'>Platforms:</h5>
            <div className='tags'>
              {game.platform_tags?.map((name) => (
                <div className='single-tag'>{name}</div>
              ))}
          </div>
          </div>
        </div>
        {idx != games.length-1 ? <hr className='separator'/> : null}
        </>
      )) : <div>Nothing to display :/</div>}</div>
    </div>
    </>
  )
}

export default SearchBar;