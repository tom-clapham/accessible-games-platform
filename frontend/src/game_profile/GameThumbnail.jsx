function GameThumbnail({ url, name }) {
    return (
        <img 
            src={url}
            alt={`${name} cover`}
            loading="lazy"
            style={{ width: "100%", maxWidth: 500, borderRadius: 12}}
            className="gp-thumbnail"
        />
    );
}

export default GameThumbnail;