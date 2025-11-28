import { useState, useEffect } from 'react';
import GameTrailer from '../game_profile/GameTrailer';
import GameTag from '../game_profile/GameTag';
import GameThumbnail from '../game_profile/GameThumbnail'
import '../game_profile/game_profile_styles.css';
import styles from './PublisherNewGame.module.css';

import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-dark-indigo/theme.css";

function PublisherNewGame() {
    // These will store all the details that need to be filled
    const [gameName, setGameName] = useState("");
    const [description, setDescription] = useState("");
    const [trailerUrl, setTrailerUrl] = useState("https://youtu.be/7GGajk7cwYw");
    const [thumbnailUrl, setThumbnailUrl] = useState("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=");
    const [price, setPrice] = useState(0.00);
    const [releaseDate, setReleaseDate] = useState();
    const [preview, setPreview] = useState(false);
    const publisher = "default publisher"; // This will be taken from the authentication token from the user
    const [selectedAccessibilityTags, setSelectedAccessibilityTags] = useState();
    const [selectedGenreTags, setSelectedGenreTags] = useState();
    const [selectedPlatformTags, setSelectedPlatformTags] = useState();
    const free = new RegExp("^(?:[0]+?(?:\.|\,)?0*?)?$")

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

    // This will make the request to create the game
    function createGame() {
        console.log(gameName, description)
    }

    // return the price
    function formatPrice(price) {
        console.log(price)
        return free.test(price) ? 'Free' : `£${price}`
    }

    // format the date
    function formatDate(date) {
        console.log(date)
    }

    useEffect(() => {
        console.log(releaseDate);
    }, [releaseDate]);
    

    return(
        <>
        { preview ? (<button onClick={() => setPreview(false)}>Edit</button>) : (<button onClick={() => setPreview(true)}>Preview</button>) }
        { !preview ? (<form onSubmit={createGame} className={styles.formArea}>
            {/* <div className={styles.horizontalSection}> */}
            <div className={styles.doubleAreas}>
                <label className={styles.doubleLabels}>Game name:<br/>
                    <input className={styles.doubleInputs} onChange={(e) => setGameName(e.target.value)} value={gameName} required/>
                </label><br/>
                <label className={styles.doubleTags}>
                    Accessibility tags:<br/>
                    <MultiSelect 
                        value={selectedAccessibilityTags}
                        onChange={(e) => setSelectedAccessibilityTags(e.value)}
                        placeholder="Select Accessibility Tags" 
                        options={accessibilityTagsOptions}
                        display="chip"
                        className="accessibility-tags-multiselect"
                    />
                </label>
            </div>
            <div className={styles.doubleAreas}>
                <label className={styles.doubleLabels}>Price:<br/>
                    <input className={styles.doubleInputs} onChange={(e) => setPrice(e.target.value.replaceAll(" ", ""))} value={price}/>
                </label><br/>
                <label className={styles.doubleTags}>
                    Genre tags:<br/>
                    <MultiSelect 
                        value={selectedGenreTags} 
                        onChange={(e) => setSelectedGenreTags(e.value)}
                        placeholder="Select Genres" 
                        options={genreTagsOptions}
                        display="chip"
                        className="genre-tags-multiselect"
                    />
                </label>
            </div>
            <div className={styles.doubleAreas}>
                <label className={styles.doubleLabels}>Release date:<br/>
                    <input className={styles.doubleInputs} type={'date'} onChange={(e) => setReleaseDate(e.target.value)} value={releaseDate} required/>
                </label><br/>
                <label className={styles.doubleTags}>
                    Platform tags:<br/>
                    <MultiSelect
                        value={selectedPlatformTags} 
                        onChange={(e) => setSelectedPlatformTags(e.value)}
                        placeholder="Select Platforms" 
                        options={platformTagsOptions}
                        display="chip"
                        className="platform-tags-multiselect"
                    />
                </label>
            </div>
            {/* </div>     */}
            <label className={styles.descriptionArea}>Description:<br/>
                <textarea className={styles.description} onChange={(e) => setDescription(e.target.value)} value={description} required/>
            </label>
            <label className={styles.urlArea}>Thumbnail image link:<br/>
                <input className={styles.urlBox} type={'url'}/>
            </label>
            <label className={styles.urlArea}>Trailer URL:<br/>
                <input className={styles.urlBox} type={'url'}/>
            </label>
            {/* <label>
                On sale:
                <input type={'checkbox'}/>
            </label> */}
            <button type={'submit'}>Create</button>
        </form>) : (<div>
            <div className="gp-page">
                <h1 className="gp-title">{gameName}</h1>
                <div className="gp-grid">

                    <div className="gp-main">

                        <div className="gp-trailer">
                            <GameTrailer url={trailerUrl} name={gameName}/><br/>
                        </div>

                        <h2>Description</h2>
                        <div className="gp-description">
                            {description}
                        </div>

                        <h2>Accessibility Tags</h2>
                        <div className="tag_container">
                            {selectedAccessibilityTags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

                        <h2>Genres</h2>
                        <div className="tag_container">
                            {selectedGenreTags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

                        <h2>Platforms</h2>
                        <div className="tag_container">
                            {selectedPlatformTags?.map((name) => (
                                <GameTag name={name}/>
                            ))}
                        </div>

            <h2 className="gp-reviews">Reviews</h2>
                    </div>

                    <div className="gp-sideinfo">
                        <div className="gp-infocard">
                            <div className="gp-thumbnail-container">
                                <GameThumbnail url={thumbnailUrl} name={gameName}/>
                            </div>
                            <div className="gp-metadata">
                                <h2 className="gp-name">{gameName}</h2>
                                <div className="gp-price">{formatPrice(price)}</div>
                                
                                <div className="gp-info-row-top">
                                    <div className="gp-info-label">PUBLISHER</div>
                                    <div className="gp-info-value">{publisher}</div>
                                </div>

                                <div className="gp-info-row">
                                    <div className="gp-info-label">RELEASE DATE</div>
                                    <div className="gp-info-value">{releaseDate}
                                    </div>
                                </div>

                                <button className="gp-button">Add to favourite games</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>)}
        </>
    )
};
export default PublisherNewGame;