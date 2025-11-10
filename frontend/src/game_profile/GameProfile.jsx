import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

import GameThumbnail from './GameThumbnail';
import GameTrailer from './GameTrailer';

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
            <h1>{game.name}</h1>

            <GameThumbnail url={game.thumbnail_url} name={game.name}/><br/>

            <GameTrailer url={game.trailer_url} name={game.name}/><br/>

            <section>PRICE: £{game.price}</section><br/>
            <section>PUBLISHER: {game.publisher}</section><br/>
            <section>RELEASE DATE: {game.release_date}</section><br/>
            <section>{game.description}</section><br/>
        </div>
    )
}

export default GameProfile;