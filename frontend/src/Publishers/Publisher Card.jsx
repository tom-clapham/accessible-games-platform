import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import '../Publishers/Publishers.css'

function PublisherCard({id, name, logo}){
    return (
        <div className="pc-container">
            <Link className='pc-link' to={`/publisher/${id}`}>
            <div className="pc-card-container">
                <div className="pc-image-box">
                    <img src={`http://localhost:8000${logo}`}></img>
                </div>
                <h2 className="pc-text">{name}<FaCheckCircle className="pc-verified-icon"/></h2>
            </div>
            </Link>
        </div>
    )
}
  
export default PublisherCard