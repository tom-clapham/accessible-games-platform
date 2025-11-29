import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Publisher_Info = () => {

  const {id} = useParams();
  const [publisher, setPublisher] = useState(null)
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

  function handleURL(url){
    window.open(url, '_blank');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <h1>{publisher.name}</h1>
        <h1>{publisher.url}</h1>
        <button onClick={() => handleURL(publisher.url)}>Visit Publisher Website</button>
    </div>
  )
}

export default Publisher_Info