import { Link } from "react-router-dom";

function PublisherCard({id, name, logo}){
    return (
        <div>
            <Link to={`/publisher/${id}`}>
                <h2>{name}</h2>
                <img src={`http://localhost:8000${logo}`}></img>
            </Link>
        </div>
    )
}
  
export default PublisherCard