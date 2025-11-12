import axios from 'axios';
import { useEffect, useState } from 'react';
import './Discover.css';
import GameCard from './GameCard.jsx';


function Discover() {
    const [games, setGames] = useState([]);
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
                    {games.map((game) => (
                        GameCard({ game })
                    ))}
                </div>

        </div>
    )
}

export default Discover;