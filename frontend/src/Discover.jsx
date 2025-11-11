import axios from 'axios';
import { useEffect, useState } from 'react';
import './discover_components/Discover.css';


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
            <h1>Discover</h1>
            <div className="carousel">
                {games.map((game) => (
                    <div key={game.id} className="game_card">
                        <div className="thumbnail">
                            <img src={game.thumbnail_url} alt={game.name} />
                        </div>
                    <div className="card_info">
                        <h2>{game.name}</h2>
                        <p>{game.price}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Discover;