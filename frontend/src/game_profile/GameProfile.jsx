import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

import GameThumbnail from './GameThumbnail';
import GameTrailer from './GameTrailer';
import GameTag from './GameTag';

import "./game_profile_styles.css";

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
            <div className="gp-page">
                <h1 className="gp-title">{game.name}</h1>
                <div className="gp-grid">

                    <div className="gp-main">

                        <div className="gp-trailer">
                            <GameTrailer url={game.trailer_url} name={game.name}/><br/>
                        </div>

                        <h2>Description</h2>
                        <div className="gp-description">
                            {game.description}
                        </div>

                        <h2>Accessibility Tags</h2>
                        <div className="tag_container">
                            {game.accessibility_tags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

                        <h2>Genres</h2>
                        <div className="tag_container">
                            {game.genre_tags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

                        <h2>Platforms</h2>
                        <div className="tag_container">
                            {game.platform_tags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

                        <h2>Reviews</h2>
                    </div>

                    <div className="gp-sideinfo">
                        <div className="gp-infocard">
                            <div className="gp-thumbnail-container">
                                <GameThumbnail url={game.thumbnail_url} name={game.name}/>
                            </div>
                            <div className="gp-metadata">
                                <h2 className="gp-name">{game.name}</h2>
                                <div className="gp-price">£{game.price}</div>
                                <button className="gp-button">Add to favourites</button>
                                <div className="gp-publisher">PUBLISHER: {game.publisher}</div>
                                <div className="gp-releasedate">RELEASE DATE: {game.release_date}</div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default GameProfile;