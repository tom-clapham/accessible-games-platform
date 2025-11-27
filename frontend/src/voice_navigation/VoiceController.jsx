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

    const [isSupported, setIsSupported] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState("");

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

        const context = { route: location.pathname }

        const { intent, params } = detectIntent(trimmedCommandTranscript, context);
        performIntentAction(intent, params);
    }


    const performIntentAction = (intent, params) => {
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
        }
    }

    
    return (
        <div className="voice-controller-container">
            <button type="button" className="voice-command-button" onClick={startListening}><FiMic/></button>
        </div>
    )
}

export default VoiceController;