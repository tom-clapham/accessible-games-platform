import "./game_profile_styles.css";

function GameTag({ name }) {
    return (
        <div className="tag">
            {name}
        </div>
    );
}

export default GameTag;