import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";
import GameCard from '../browse/GameCard';

const Publisher_Info = () => {

  const {id} = useParams();
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/app/publishers/publisher/${id}`)
    .then(response => {
        setPublisher(response.data[0]);
        setLoading(false);
    })
    .catch(error => {
        console.error(error);
        setLoading(false);
    });

  }, [id]);

  useEffect(() => {
    if (!publisher?.id) return;
    axios.get(`http://127.0.0.1:8000/app/games/games/publisher`, { params: {id : publisher.id }})
    .then(response => {
        console.log(response.data)
        setGames(response.data)
    })
    .catch(error => {
        console.error(error);
    });

  }, [publisher]);

  function handleURL(url){
    window.open(url, '_blank');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='p-container'>
      <div className='pi-info-container'>
        <div className='pi-logo-text'>
          <div className='pi-image-box'>
            <img src={`http://localhost:8000${publisher.logo}`}></img>
          </div>
          <h1 className='pi-info'>{publisher.name}<FaCheckCircle className='pc-verified-icon'/></h1>
        </div>
        <button className='pi-visit-website' onClick={() => handleURL(publisher.url)}>Visit Publisher Website</button>
      </div>
      <div className="pi-games-container">
          {games.map((game) => (
              <GameCard 
                  id={game.id} 
                  name={game.name}
                  price={game.price}
                  image_url={game.thumbnail_url}
              />
          ))}
      </div>
    </div>
  )
}

export default Publisher_Info