import axios from 'axios';
import { useEffect, useState } from 'react';
import './Discover.css';
import GameCard from './GameCard.jsx';
import { Link } from 'react-router-dom';


function Discover() {
    const [games, setGames] = useState({
        trending_games: [],
        on_sale_games: [],
        recently_released_games: []
    });


    useEffect(() => {
    axios.get(`http://127.0.0.1:8000/app/games/discover`)
    .then(response => {
        setGames(response.data);
    })
    .catch(error => {
        console.error(error);
    });

    }, []);
    return (
        <div>
                
                <div className="carousel">
                    <h2>Trending</h2>
                    {games.trending_games.length > 0
                    ? games.trending_games.map((game) => (
                        // Links: https://api.reactrouter.com/v7/functions/react_router.Link.html
                        <Link key={game.id} to={`/gameprofile/${game.id}`}>
                        <GameCard game={game}/>
                        </Link>
                    ))
                    : <p>No games are currently trending...</p>
                    }
                </div>

                <div className="carousel">
                    <h2>On-Sale</h2>
                    {games.on_sale_games.map((game) => (
                        <Link key={game.id} to={`/gameprofile/${game.id}`}>
                        <GameCard game={game}/>
                        </Link>
                    ))}
                </div>

                <div className="carousel">
                    <h2>Latest Releases</h2>
                    {games.recently_released_games.map((game) => (
                        <Link key={game.id} to={`/gameprofile/${game.id}`}>
                        <GameCard game={game}/>
                        </Link>
                    ))}
                </div>

        </div>
    )
}

export default Discover;