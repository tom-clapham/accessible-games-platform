import axios from 'axios';
import { useEffect, useState } from 'react';
import './Discover.css';
import GameCard from './GameCard.jsx';


function Discover() {
    const [games, setGames] = useState({
        trending_games: [],
        on_sale_games: [],
        recently_released_games: []
    });
    useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/games/discover`)
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
                    {games.trending_games.map((game) => (
                        GameCard({ game })
                    ))}
                </div>

                <div className="carousel">
                    <h2>On-Sale</h2>
                    {games.on_sale_games.map((game) => (
                        GameCard({ game })
                    ))}
                </div>

                <div className="carousel">
                    <h2>Latest Releases</h2>
                    {games.recently_released_games.map((game) => (
                        GameCard({ game })
                    ))}
                </div>

        </div>
    )
}

export default Discover;