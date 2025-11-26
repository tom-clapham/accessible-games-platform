import { useEffect, useState} from 'react';
import axios from 'axios';

import GameCard from './GameCard';

import "./browse_page_styles.css";

import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-dark-indigo/theme.css";


function BrowsePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedAccessibilityTags, setSelectedAccessibilityTags] = useState();
    const [selectedGenreTags, setSelectedGenreTags] = useState();

    const accessibilityTagsOptions = [
        { label: "Vision", value: "Vision Accessibility"},
        { label: "Hearing", value: "Hearing Accessibility"},
        { label: "Speech", value: "Speech Accessibility"},
        { label: "Motor", value: "Motor Accessibility"},
        { label: "Cognitive", value: "Cognitive Accessibility"}
    ]

    const genreTagsOptions = [
        { label: "Racing", value: "Racing"},
        { label: "Action", value: "Action"},
        { label: "Action-Adventure", value: "Action-Adventure"},
        { label: "RPG", value: "RPG"},
        { label: "Simulation", value: "Simulation"},
        { label: "Sports", value: "Sports"},
        { label: "Platformer", value: "Platformer"},
        { label: "Horror", value: "Horror"},
        { label: "Shooter", value: "Shooter"},
        { label: "Puzzle", value: "Puzzle"},

    ]
    
    useEffect(() => {
        setLoading(true); 

        const filter_parameters = {}

        if (selectedAccessibilityTags?.length > 0) {
            filter_parameters.accessibility_tags = selectedAccessibilityTags
        }

        if (selectedGenreTags?.length > 0) {
            filter_parameters.genre_tags = selectedGenreTags
        }

        console.log("Filter parameters being sent:", filter_parameters);

        axios.get("http://127.0.0.1:8000/app/games/games/browse", { params: filter_parameters })
        .then(response => {
            setGames(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setLoading(false);
        });
    }, [selectedAccessibilityTags, selectedGenreTags]);

    if (!games) return <p>No games data found.</p>;

    return (
        <div>
            <div className="browse-page">
                <h1>Browse</h1>
                <div className="browse-page-headings">
                    <div className="heading">Results</div>
                    <div className="heading">Filters</div>
                </div>
                <div className="browse-page-grid">
                    <div className="filter-results-container">
                        {games.map((game) => (
                            <GameCard 
                                id={game.id} 
                                name={game.name}
                                price={game.price}
                                image_url={game.thumbnail_url}
                            />
                        ))}
                    </div>
                    <div className="filter-options-container">
                        <div className="tags-filter-container">
                            <MultiSelect 
                                value={selectedAccessibilityTags} 
                                onChange={(e) => setSelectedAccessibilityTags(e.value)}
                                placeholder="Select Accessibility Tags" 
                                options={accessibilityTagsOptions}
                                display="chip"
                                className="accessibility-tags-multiselect"
                            />
                        </div>
                        <div className="tags-filter-container">
                            <MultiSelect 
                                value={selectedGenreTags} 
                                onChange={(e) => setSelectedGenreTags(e.value)}
                                placeholder="Select Genres" 
                                options={genreTagsOptions}
                                display="chip"
                                className="genre-tags-multiselect"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowsePage;