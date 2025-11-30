import { useState, useEffect } from 'react';
import axios from 'axios'
import GameTrailer from '../game_profile/GameTrailer';
import GameTag from '../game_profile/GameTag';
import GameThumbnail from '../game_profile/GameThumbnail'
import edit_img from '../assets/editing.png';
import preview_img from '../assets/film.png';
import '../game_profile/game_profile_styles.css';
import styles from './PublisherNewGame.module.css';

import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-dark-indigo/theme.css";

function PublisherNewGame() {
    // These will store all the details that need to be filled
    const [gameName, setGameName] = useState("");
    const [description, setDescription] = useState("");
    const [trailerUrl, setTrailerUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [price, setPrice] = useState('');
    const [displayPrice, setDisplayPrice] = useState('');
    const [releaseDate, setReleaseDate] = useState();
    const [preview, setPreview] = useState(false);
    const publisher = "default publisher"; // This will be taken from the authentication token from the user
    const [selectedAccessibilityTags, setSelectedAccessibilityTags] = useState([]);
    const [selectedGenreTags, setSelectedGenreTags] = useState([]);
    const [selectedPlatformTags, setSelectedPlatformTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState();
    const free = new RegExp("^(?:[0]+?(?:\\.|\\,)?0*?)?$");

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

    useEffect(() => {
        console.log(selectedAccessibilityTags)
    }, [selectedAccessibilityTags])

    // This will make the request to create the game
    async function createGame(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/app/games/upload/", 
                {
                    "gameName": gameName,
                    "description": description,
                    "releaseDate": releaseDate,
                    "price": price,
                    "trailerUrl": trailerUrl,
                    "thumbnailUrl": thumbnailUrl,
                    "accessibilityTags": selectedAccessibilityTags,
                    "genreTags": selectedGenreTags,
                    "platformTags": selectedPlatformTags
                }
            )
            setSuccess(true)
            setGameName("")
            setPrice("")
            setReleaseDate("")
            setDescription("")
            setTrailerUrl("")
            setThumbnailUrl("")
            setSelectedAccessibilityTags([])
            setSelectedGenreTags([])
            setSelectedPlatformTags([])
        } catch (err) {
            console.log(err)
            setSuccess(false)
            setErrors(err.response.data)
        }
    }

    // return the price
    function formatPrice(price) {
        // console.log('pre formatted: ', price)
        return free.test(price) ? 'Free' : `£${price}`
        
    }

    useEffect(() => {
        setDisplayPrice(formatPrice(price))
    }, [price])
    return(
        <>
        { preview ? (<div role={'button'} data-testid='edit-btn' className={styles.previewEdit} onClick={() => setPreview(false)}><img className={styles.peImg} src={edit_img} alt='Preview button for viewing what game would look like in current state'/></div>) : (<div role={'button'} data-testid='preview-btn' className={styles.previewEdit} onClick={() => setPreview(true)}><img className={styles.peImg} src={preview_img} alt='Edit button to return to editing after viewing preview'/></div>)}
        { !preview ? (<div className={styles.formErrorArea}><form onSubmit={createGame} className={styles.formArea}>
            <div className={styles.doubleAreas}>
                <label className={styles.doubleLabels}>Game name:<br/>
                    <input className={styles.doubleInputs} onChange={(e) => setGameName(e.target.value)} value={gameName} placeholder='Name...' required/>
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
                    <input className={styles.doubleInputs} onChange={(e) => setPrice(e.target.value.replaceAll(" ", ""))} placeholder='Price in GBP...' value={price}/>
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
                    <input data-testid='release-date' className={styles.doubleInputs} type={'date'} onChange={(e) => setReleaseDate(e.target.value)} value={releaseDate} required/>
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
            <label className={styles.descriptionArea}>Description:<br/>
                <textarea className={styles.description} onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Description...' required/>
            </label>
            <label className={styles.urlArea}>Trailer URL:<br/>
                <input data-testid='trailer-url' className={styles.urlBox} type={'url'} placeholder='Please enter YouTube URL here - Placeholder video will not be present on submission' onChange={(e) => setTrailerUrl(e.target.value)} value={trailerUrl}/>
            </label>
            <label className={styles.urlArea}>Thumbnail image link:<br/>
                <input data-testid='thumbnail-url' className={styles.urlBox} type={'url'} placeholder='Please enter link to image here - Placeholder image will not be present on submission' onChange={(e) => setThumbnailUrl(e.target.value)} value={thumbnailUrl}/>
            </label>
            <button type={'submit'} className={styles.createBtn}>Create</button>
        </form>
        { !success ? Object.entries(errors).map(([key, issue], idx) => {return (<div className={styles.errorMsg} key={idx}>{`Issue with ${key} - ${issue}`}</div>)}) : (<div className={styles.successMsg}>Success!</div>) }
        </div>) : (<div>
            <div className="gp-page">
                <h1 className="gp-title">{gameName}</h1>
                <div className="gp-grid">

                    <div className="gp-main">

                        <div className="gp-trailer">
                            <GameTrailer url={trailerUrl.length>1 ? trailerUrl : "https://www.youtube.com/watch?v=EoYF4VbD9cM&list=PLaTP_B8K0vdiUP8f3h6Y2930CJS4e_e4H&index=6"} name={gameName}/><br/>
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
                                <GameThumbnail url={thumbnailUrl.length>1 ? thumbnailUrl : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} name={gameName}/>
                            </div>
                            <div className="gp-metadata">
                                <h2 className="gp-name">{gameName}</h2>
                                <div className="gp-price">{displayPrice}</div>
                                
                                <div className="gp-info-row-top">
                                    <div className="gp-info-label">PUBLISHER</div>
                                    <div className="gp-info-value">{publisher}</div>
                                </div>

                                <div className="gp-info-row">
                                    <div className="gp-info-label">RELEASE DATE</div>
                                    <div className="gp-info-value">{releaseDate ? new Date(releaseDate).toLocaleDateString('en-GB') : null}
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