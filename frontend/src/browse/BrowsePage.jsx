import { useEffect, useState} from 'react';
import axios from 'axios';

import GameCard from './GameCard';

import "./browse_page_styles.css";

function BrowsePage() {
    const [games, setGames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/app/games/games/browse`)
        .then(response => {
            setGames(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError[error];
            setLoading[false];
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading game data.</p>;
    if (!games) return <p>No games data found.</p>;

    const visibleGames = games.slice(0, 12);

    return (
        <div>
            <div className="browse-page">
                <h1>Browse</h1>
                <h2>Filter Results</h2>
                <div className="browse-page-grid">
                    <div className="filter-results-container">
                        {visibleGames.map((game) => (
                            <GameCard 
                                id={game.id} 
                                name={game.name}
                                price={game.price}
                                image_url={game.thumbnail_url}
                            />
                        ))}
                    </div>
                    <div className="filter-options-container">
                        <h2>Filters here</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowsePage;