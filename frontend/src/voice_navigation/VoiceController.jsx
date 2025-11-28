import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { INTENTS, detectIntent } from "./intentMapping";

import "./voice_controller_styles.css";
import { FiMic, FiMicOff, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Fuse from "fuse.js";
import CommandFeedbackPanel from "./CommandFeedbackPanel";

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
const getSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognition ? new SpeechRecognition() : null;
};


export const openGameByName = async (commandGameName, navigateFunction) => {
        try {
            // Fetch all games
            const response = await fetch("http://127.0.0.1:8000/app/games/games");
            const allGames = await response.json();

            // Use fuse library to find closest game to spoken game name
            const fuse = new Fuse(allGames, {
                keys: ['name'],
                threshold: 0.4,
            })

            // Search using fuse library
            const results = fuse.search(commandGameName)

            if (results.length == 0) {
                console.warn("Voice Controller could not find any games called", commandGameName);
                return;
            }

            console.log("Closest game found:", results[0].item)

            // Use closest game match
            const closestMatchGame = results[0].item;
            navigateFunction(`/gameprofile/${closestMatchGame.id}`);

        } catch (error) {
            console.error("Voice Controller failed to open game:", error)
        }
    }


function VoiceController() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const speechRecognitionRef = useRef(null);
    const locationRef = useRef(location);
    const keepListeningRef = useRef(false);

    const [commandFeedbackVisible, setCommandFeedbackVisible] = useState(false);
    const [lastTranscript, setLastTranscript] = useState(null);
    const [lastCommand, setLastCommand] = useState(null);

    const [isSupported, setIsSupported] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        locationRef.current = location;
    }, [location]);

    useEffect(() => {
        const speechRecognition = getSpeechRecognition();
        if (!speechRecognition) {
            setIsSupported(false);
            return;
        }

        speechRecognition.continuous = true;
        speechRecognition.language = "en-GB";

        speechRecognition.onstart = () => {
            setIsListening(true);
            setError("");
        };

        speechRecognition.onerror = (errorMessage) => {
            console.error("Speech recognition error:", errorMessage);
            setError("There was an error with the voice recognition, please try again.")
            setIsListening(false);
            keepListeningRef.current = false;
        };

        speechRecognition.onend = () => {
            setIsListening(false);

            if (keepListeningRef.current) {
                try {
                    speechRecognition.start();
                } catch (error) {
                    console.warn("Failed to start voice recognition:", error)
                    keepListeningRef.current = false;
                }
            }
        }

        speechRecognition.onresult = (result) => {
            let commandTranscript = "";

            for (let i = result.resultIndex; i < result.results.length; i++) {
                const transcript = result.results[i][0].transcript;
                commandTranscript += transcript;
            };

            if (commandTranscript) {
                console.log(commandTranscript);
                handleCommandTranscript(commandTranscript);
            }
        }

        speechRecognitionRef.current = speechRecognition
    }, []);


    const toggleListening = () => {
        const speechRecognition = speechRecognitionRef.current;

        if (isListening || keepListeningRef.current ) {
            // If already listening, then turn it off
            keepListeningRef.current = false;
            try {
                speechRecognition.stop();
            } catch(error) {
                console.warn("Failed to stop voice recognition:", error)
            }
        } else {
            // If not already listening, then turn it on
            keepListeningRef.current = true;
            try {
                speechRecognition.start();
            } catch(error) {
                console.warn("Failed to start voice recognition:", error)
                keepListeningRef.current = false;
            }
        }
    }


    const handleCommandTranscript = (commandTranscript) => {
        const trimmedCommandTranscript = commandTranscript.trim();

        // Update the current location to get most up to date context, such as the currently applied filters
        const currentLocation = locationRef.current;
        const context = { route: currentLocation.pathname }

        let intent = null;
        let params = {};

        // Try to detect the intent providing the command transcript
        try {
            const result = detectIntent(trimmedCommandTranscript, context) || {};
            intent = result.intent || null;
            params = result.params || {};

        } catch (error) {
            console.error("detectIntent failed:", error)

            setLastCommand({
                transcript: trimmedCommandTranscript,
                intent: "NO_COMMAND_FOUND",
                params: {}
            });

            return;
        }

        // If no intent could be detected, say no command found
        if (!intent) {
            setLastCommand({
                transcript: trimmedCommandTranscript,
                intent: "NO_COMMAND_FOUND",
                params: {},
            });
            return;
        }

        setLastCommand({
            transcript: trimmedCommandTranscript,
            intent,
            params,
        });

        let finalParams = params || {};

        // Special case for voice commands for opening game pages
        if (intent === INTENTS.OPEN_GAME) {
            const lower = commandTranscript.toLowerCase().trim();
            const keyword = "open ";

            if (lower.startsWith(keyword)) {
                const gameName = trimmedCommandTranscript.slice(keyword.length).trim();
                if (gameName) {
                    finalParams = { ...finalParams, gameName };
                }
            }
        }

        performIntentAction(intent, finalParams);
    }


    const applyFilterParamsAndNavigate = (params) => {
        const currentLocation = locationRef.current;
        const searchParams = new URLSearchParams(currentLocation.search);

        // Genre tags
        if (params.genre) {
            const currentGenres = searchParams.getAll("genre");

            // Add the applied genre tag if does not exist already
            if (!currentGenres.includes(params.genre)) {
                currentGenres.push(params.genre);
            }

            // Add new genre tag ontop of previously existing genre tags
            searchParams.delete("genre");
            currentGenres.forEach((g) => {
                searchParams.append("genre", g);
            });
        }

        // Platform tags
        if (params.platform) {
            const currentPlatforms = searchParams.getAll("platform");

            // Add the applied platform tag if does not exist already
            if (!currentPlatforms.includes(params.platform)) {
                currentPlatforms.push(params.platform);
            }

            // Add new platform tag ontop of previously existing platform tags
            searchParams.delete("platform");
            currentPlatforms.forEach((p) => {
                searchParams.append("platform", p);
            });
        }

        // Accessibility tags
        if (params.accessibility) {
            const currentAccessibility = searchParams.getAll("accessibility");

            // Add the applied accessibility tag if does not exist already
            if (!currentAccessibility.includes(params.accessibility)) {
                currentAccessibility.push(params.accessibility);
            }

            // Add new accessibility tag ontop of previously existing accessibility tags
            searchParams.delete("accessibility");
            currentAccessibility.forEach((a) => {
                searchParams.append("accessibility", a);
            });
        }

        // Sort order
        if (params.sort) {
            searchParams.set("sort", params.sort)
        }

        // Navigate with new queryString containing previous and new query params
        const queryString = searchParams.toString();
        navigate(`/browse${queryString ? `?${queryString}` : ""}`);
    };


    const navigateToReviews = (urlPath) => {
        const urlSegments = urlPath.split("/");
        let gameId = null;

        const gameProfileId = urlSegments.indexOf("gameprofile");
        if (gameProfileId !== -1 && urlSegments[gameProfileId + 1]) {
            gameId = urlSegments[gameProfileId + 1];
        }

        if (gameId) {
            navigate(`/reviews/${gameId}`);
        } else {
            console.warn("Voice Controller could not find any games with ID to go to its reviews")
        }
    }


    const resetFilters = (params) => {
        const current_location = locationRef.current;
        const searchParams = new URLSearchParams(current_location);

        // Remove all filters
        searchParams.delete("genre");
        searchParams.delete("platform");
        searchParams.delete("accessibility");

        const queryString = params.toString();
        navigate(`/browse${queryString ? `?${queryString}` : ""}`);
    }


    // Perform action on screen according to provided intent and params (if any provided)
    const performIntentAction = (intent, params) => {
        console.log("Intent:", intent, "Params:", params);

        switch (intent) {
            case INTENTS.OPEN_DISCOVER:
                navigate("/discover")
                break;

            case INTENTS.OPEN_BROWSE:
                navigate("/browse")
                break;

            case INTENTS.OPEN_LOGIN:
                navigate("/login")
                break;

            case INTENTS.OPEN_REGISTER:
                navigate("/register/step_1/")
                break;

            case INTENTS.OPEN_REVIEWS:
                const urlPath = locationRef.current.pathname;
                navigateToReviews(urlPath)
                break;

            case INTENTS.OPEN_GAME:
                if (params.gameName) {
                    openGameByName(params.gameName, navigate);
                }
                break;

            case INTENTS.GO_BACK:
                navigate(-1);
                break;

            case INTENTS.SCROLL_UP:
                window.scrollBy({
                    top: -650,
                    behavior: "smooth",
                })
                break;

            case INTENTS.SCROLL_DOWN:
                window.scrollBy({
                    top: 650,
                    behavior: "smooth",
                })
                break;

            case INTENTS.GO_TO_TOP:
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
                break;

            case INTENTS.FILTER_BY_GENRE:
                applyFilterParamsAndNavigate({ genre: params.genre });
                break;

            case INTENTS.FILTER_BY_PLATFORM:
                applyFilterParamsAndNavigate({ platform: params.platform});
                break;

            case INTENTS.FILTER_BY_ACCESSIBILITY:
                applyFilterParamsAndNavigate({ accessibility: params.accessibility});
                break;
            
            case INTENTS.RESET_FILTERS:
                resetFilters({ genre: params. genre, platform: params.platform, accessibility: params.accessibility});
                break;

            case INTENTS.SET_SORT_ORDER:
                applyFilterParamsAndNavigate({ sort: params.sort });
                break;
        }
    }

    
    return (
        <div className="voice-controller-container">

            {commandFeedbackVisible && (
                <CommandFeedbackPanel lastCommand={lastCommand}/>
            )}

            <button
                type="button"
                className="command-feedback-toggle"
                onClick={() => setCommandFeedbackVisible((v) => !v)}
                aria-label="Show command feedback"
            >
                {commandFeedbackVisible ? <FiChevronLeft/> : <FiChevronRight/> }
            </button>
            
            <button 
                type="button" 
                className={`voice-command-button ${isListening ? "listening" : ""}`} 
                onClick={toggleListening}
                aria-label={isListening ? "Turn off voice navigation" : "Turn on voice navigation"}
            >
            {isListening ? <FiMic /> : <FiMicOff />}
            </button>
        </div>
    )
}

export default VoiceController;