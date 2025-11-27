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
    // Get url of video
    const u = new URL(url);

    // Get the ID of the video to turn it into embed
    let videoId = null;

    if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
      videoId = u.searchParams.get("v");
    }

    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    }

    // Make the video play by default, and mute by default
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    }

    return url;
  } catch {
    return url;
  }
}

