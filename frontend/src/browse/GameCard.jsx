import { Link } from "react-router-dom";
import "./browse_page_styles.css";

function GameCard({ id, name, price, image_url }) {
    return (
        <div className="game-card">
            <Link to={`/gameprofile/${id}`} className="game-card-link">
            <img 
                src={image_url}
                alt={`${name} cover`}
                loading="lazy"
                className="game-image"
            />
            </Link>
            <div className="game-name">
                {name}
            </div>
            <div className="game-price">
                £{price}
            </div>
        </div>
    )
}

export default GameCard;