import './Discover.css'


function GameCard({ game }) {

    return (
    <div className="game_card">
                            <div className="thumbnail">
                                <img src={game.thumbnail_url} alt={game.name} />
                            </div>
                            <div className="card_info">
                                <h2>{game.name}</h2>
                                <p>{game.price}</p>
                            </div>
                        </div>
    )
}