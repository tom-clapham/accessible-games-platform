import "./browse_page_styles.css";

function GameCard({ name, price, image_url }) {
    return (
        <div className="game-card">
            <img 
                src={image_url}
                alt={`${name} cover`}
                loading="lazy"
                className="game-image"
            />
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