import "./game_profile_styles.css";

function GameTrailer({ url, name }) {
    if (!url) return null;

    const embed = toEmbed(url);
    return (
      <div className="gp-video-wrap">
        <iframe
            className="gp-iframe"
            src={embed}
            title={`${name} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0, borderRadius: 12 }}
        />
      </div>
    );
}

export default GameTrailer;

function toEmbed(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    return url;
  } catch {
    return url;
  }
}

