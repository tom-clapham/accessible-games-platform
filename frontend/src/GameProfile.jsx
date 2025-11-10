import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

function GameProfile() {
    const {id} = useParams(); // get ID of game from the URL, will change this to name/slug later 
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/app/games/games/${id}`)
        .then(response => {
            setGame(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setLoading(false);
        });

    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading game data.</p>;
    if (!game) return <p>No game data found.</p>;

    return(
        <div>
            <h1>Game name: {game.name}</h1>
            <section>Game publisher: {game.publisher}</section>
            <section>Game description: {game.description}</section>
        </div>
    )
}

export default GameProfile;