import { Link } from "react-router-dom";

function PublisherCard({id, name}){
    return (
        <div>
            <Link to={`/publisher/${id}`}>
                <h2>{name}</h2>
            </Link>
        </div>
    )
}
  
export default PublisherCard