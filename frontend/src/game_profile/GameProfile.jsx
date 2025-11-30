import { useEffect, useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

import GameThumbnail from './GameThumbnail';
import GameTrailer from './GameTrailer';
import GameTag from './GameTag';
import { addToFavourites, user_info, removeFromFavourites, checkFavouriteGame } from '../endpoints/api';
import {useAuth} from '../contexts/useAuth'

import "./game_profile_styles.css";

import { Link } from 'react-router-dom';

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

function formatPrice(price) {
  if (price === "0" || price === "0.00") {
    price = 'Free';
  } else {
    price = `£${price}`
  }

  return price;
}

function GameProfile() {
    const {id} = useParams(); // get ID of game from the URL, will change this to name/slug later 
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [favourite, setFavourite] = useState();
    const [user, setUser] = useState(false);
    const [successRemove, setSuccessRemove] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    
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

    useEffect(() => {
        const fetch_info = async () => {
            const success = await user_info()
            if(success){
                setUser(success)
            }
        }
        fetch_info();
    })

    useEffect(() => {
        const fetch_info = async () => {
            const success = await checkFavouriteGame(game.name)
            if(success){
                setFavourite(true)
            } else {
                setFavourite(false)
            }
        }
        fetch_info();
    }, [game])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading game data.</p>;
    if (!game) return <p>No game data found.</p>;

    const handleAddToFavourites = async () => {
        if(favourite){
            await removeFromFavourites(game.name);
            setSuccessRemove(true);
            setFavourite(false)
            const timeout = setTimeout(() => {
                setSuccessRemove(false);
            }, 3000);
        } else {
            await addToFavourites(game.name);
            setSuccessAdd(true);
            setFavourite(true)
            const timeout = setTimeout(() => {
                setSuccessAdd(false);
            }, 3000);
        }
        
    }

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

            <h2 className="gp-reviews" onClick={() => navigate(`/reviews/${id}`)}>Reviews</h2>
                    </div>

                    <div className="gp-sideinfo">
                        <div className="gp-infocard">
                            <div className="gp-thumbnail-container">
                                <GameThumbnail url={game.thumbnail_url} name={game.name}/>
                            </div>
                            <div className="gp-metadata">
                                <h2 className="gp-name">{game.name}</h2>
                                <div className="gp-price">{formatPrice(game.price)}</div>
                                
                                <div className="gp-info-row-top">
                                    <div className="gp-info-label">PUBLISHER</div>
                                    <div className="gp-info-value">{game.publisher}</div>
                                </div>

                                <div className="gp-info-row">
                                    <div className="gp-info-label">RELEASE DATE</div>
                                    <div className="gp-info-value">{formatDate(game.release_date)}</div>
                                </div>

                                {user ? <button className="gp-button" onClick={handleAddToFavourites}>{favourite ? 'Remove from favourites': 'Add to favourites'}</button> 
                                : <button className="gp-button" style={{ backgroundColor: 'grey' }} disabled onClick={handleAddToFavourites}>{favourite ? 'Remove from favourites' : 'Add to favourites'}</button>}

                                {successAdd &&(<div className="gp-success">Successfully added to favourites.</div>)}
                                {successRemove &&(<div className="gp-success">Successfully removed from favourites.</div>)}
                                <Link to={`/report/game/${game.id}`}>
                                <button className="gp-button-report">Report</button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default GameProfile;