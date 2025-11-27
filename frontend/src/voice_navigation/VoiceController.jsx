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

        const currentLocation = locationRef.current;
        const context = { route: currentLocation.pathname }

        const { intent, params } = detectIntent(trimmedCommandTranscript, context);
        performIntentAction(intent, params);
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
        }
    }

    
    return (
        <div className="voice-controller-container">
            <button type="button" className="voice-command-button" onClick={startListening}><FiMic/></button>
        </div>
    )
}

export default VoiceController;