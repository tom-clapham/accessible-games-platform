import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const Publisher_Info = () => {

  const [publisher, setPublisher] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

  useEffect(() => {
    setLoading(true)
        axios.get(`http://127.0.0.1:8000/app/publisher/${id}`)
        .then(response => {
            setPublisher(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setLoading(false);
        });

  }, [id]);

  return (
    <div>
        <h1>name = {publisher.name}</h1>
    </div>
  )
}

export default Publisher_Info