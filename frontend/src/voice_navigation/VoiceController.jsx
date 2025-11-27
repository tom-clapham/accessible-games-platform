import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { INTENTS, detectIntent } from "./intentMapping";

import "./voice_controller_styles.css";
import { FiMic } from "react-icons/fi";

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
const getSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognition ? new SpeechRecognition() : null;
};

function VoiceController() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const speechRecognitionRef = useRef(null);
    const locationRef = useRef(location);

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

        speechRecognition.continuous = false;
        speechRecognition.language = "en-GB";

        speechRecognition.onstart = () => {
            setIsListening(true);
            setError("");
        };

        speechRecognition.onerror = (errorMessage) => {
            console.error("Speech recognition error:", errorMessage);
            setError("There was an error with the voice recognition, please try again.")
            setIsListening(false);
        };

        speechRecognition.onend = () => {
            setIsListening(false);
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


    const startListening = () => {
        try {
            speechRecognitionRef.current.start();
        } catch (error) {
            console.warn("Failed to start recognition of voice message:",)
        }
    }


    const handleCommandTranscript = (commandTranscript) => {
        const trimmedCommandTranscript = commandTranscript.trim();

        // Update the current location to get most up to date context, such as the currently applied filters
        const currentLocation = locationRef.current;
        const context = { route: currentLocation.pathname }

        const { intent, params } = detectIntent(trimmedCommandTranscript, context);

        let finalParams = params || {};

        // Special case for voice commands for opening game pages
        if (intent === INTENTS.OPEN_GAME) {
            const lower = commandTranscript.trim();
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

    const openGameByName = async (commandGameName) => {
        try {
            // Fetch all games
            const response = await fetch("http://127.0.0.1:8000/app/games/games");
            const allGames = await response.json();

            const targetGameName = commandGameName.toLowerCase();

            // Try find a game fully matching to command's game name
            let game = allGames.find(
                (game) => game.name.toLowerCase() === targetGameName
            );

            // Try find a game partially matching the command's game name
            if (!game) {
                game = allGames.find(
                    (game) => game.name.toLowerCase().includes(targetGameName)
                )
            }

            if (!game) {
                console.warn("No game found for spoken command:", commandGameName)
                return;
            }

            navigate(`/gameprofile/${game.id}`);

        } catch (error) {
            console.error("Voice Controller failed to open game:", error)
        }
    }


    const performIntentAction = (intent, params) => {
        console.log("Intent:", intent, "Params:", params);

        switch (intent) {
            case INTENTS.OPEN_DISCOVER:
                navigate("/discover")
                break;

            case INTENTS.OPEN_BROWSE:
                navigate("/browse")
                break;

            case INTENTS.OPEN_COMMUNITY:
                navigate("/community")
                break;

            case INTENTS.OPEN_GAME:
                if (params.gameName) {
                    openGameByName(params.gameName);
                }
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
            <button type="button" className="voice-command-button" onClick={startListening}><FiMic/></button>
        </div>
    )
}

export default VoiceController;