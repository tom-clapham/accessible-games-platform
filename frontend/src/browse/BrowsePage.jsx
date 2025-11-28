import { useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import GameCard from './GameCard';
import { sortGames } from "./utils/sortGames";

import "./browse_page_styles.css";

import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-dark-indigo/theme.css";


function BrowsePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedAccessibilityTags, setSelectedAccessibilityTags] = useState(() => searchParams.getAll("accessibility") || []);
    const [selectedGenreTags, setSelectedGenreTags] = useState(() => searchParams.getAll("genre") || []);
    const [selectedPlatformTags, setSelectedPlatformTags] = useState(() => searchParams.getAll("platform") || []);
    const [sortOption, setSortOption] = useState(() => searchParams.get("sort") || "releaseNewestToOldest") // Sort by newest games by default


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
        { label: "Adventure", value: "Adventure"},
        { label: "RPG", value: "RPG"},
        { label: "Simulation", value: "Simulation"},
        { label: "Sports", value: "Sports"},
        { label: "Platformer", value: "Platformer"},
        { label: "Horror", value: "Horror"},
        { label: "Shooter", value: "Shooter"},
        { label: "Puzzle", value: "Puzzle"},
    ]

    const platformTagsOptions = [
        { label: "PC", value: "PC"},
        { label: "PlayStation", value: "PlayStation"},
        { label: "Xbox", value: "Xbox"},
        { label: "Nintendo Switch", value: "Nintendo Switch"},
        { label: "iOS", value: "iOS"},
        { label: "Android", value: "Android"},
    ]

    const sortOptions = [
        { label: "Name (A → Z)", value: "nameAscending"},
        { label: "Name (Z → A)", value: "nameDescending"},
        { label: "Price (Lowest)", value: "priceLowestToHighest"},
        { label: "Price (Highest)", value: "priceHighestToLowest"},
        { label: "Release Date (Newest)", value: "releaseNewestToOldest"},
        { label: "Release Date (Oldest)", value: "releaseOldestToNewest"},
    ]
    

    // Update filter params in URL to keep state
    useEffect(() => {
        const url_parameters = {};

        if (selectedAccessibilityTags?.length > 0) {
            url_parameters.accessibility = selectedAccessibilityTags;
        }

        if (selectedGenreTags?.length > 0) {
            url_parameters.genre = selectedGenreTags;
        }

        if (selectedPlatformTags?.length > 0) {
            url_parameters.platform = selectedPlatformTags 
        }

        url_parameters.sort = sortOption;

        setSearchParams(url_parameters);
    }, [selectedAccessibilityTags, selectedGenreTags, selectedPlatformTags, sortOption, setSearchParams])


    // Fetch games from backend based on filters
    useEffect(() => {
        setLoading(true); 

        const filter_parameters = {}

        if (selectedAccessibilityTags?.length > 0) {
            filter_parameters.accessibility_tags = selectedAccessibilityTags;
        }

        if (selectedGenreTags?.length > 0) {
            filter_parameters.genre_tags = selectedGenreTags;
        }

        if (selectedPlatformTags?.length > 0) {
            filter_parameters.platform_tags = selectedPlatformTags;
        }

        axios.get("http://127.0.0.1:8000/app/games/games/browse", { params: filter_parameters })
        .then(response => {
            const sortedGames = sortGames(response.data, sortOption)
            setGames(sortedGames);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setLoading(false);
        });
    }, [selectedAccessibilityTags, selectedGenreTags, selectedPlatformTags, sortOption]);


    if (!games) return <p>No games data found.</p>;


    return (
        <div>
            <div className="browse-page">
                <h1>Browse</h1>
                <div className="browse-page-headings">
                    <div className="heading-sort-by">
                        <span className="heading-label">Sort by:</span>
                        <div className="sort-option-container">
                            <Dropdown 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.value)} 
                                options={sortOptions} 
                                optionLabel="label" 
                                placeholder="Select an option" 
                                className="sort-option-select" 
                            />
                        </div>
                    </div>
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
                        <div className="tags-filter-container">
                            <MultiSelect 
                                value={selectedPlatformTags} 
                                onChange={(e) => setSelectedPlatformTags(e.value)}
                                placeholder="Select Platforms" 
                                options={platformTagsOptions}
                                display="chip"
                                className="platform-tags-multiselect"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowsePage;