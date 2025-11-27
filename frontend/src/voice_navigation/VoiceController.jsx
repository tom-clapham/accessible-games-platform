import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { INTENTS } from "./intentMapping";

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
    const [lastTranscript, setLastTranscript] = useState("");
    const [lastAction, setLastAction] = useState("");
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
            setLastTranscript("");
            setLastAction("");
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
                if (result.results[i].isFinal) {
                    commandTranscript += transcript;
                }
            };

            if (commandTranscript) {
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
    }


    return (
        <div className="voice-controller-container">
            <button type="button" className="voice-command-button" onClick={startListening}><FiMic/></button>
        </div>
    )
}

export default VoiceController;