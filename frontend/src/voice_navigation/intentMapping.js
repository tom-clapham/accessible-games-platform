export const INTENTS = {
    OPEN_DISCOVER: "OPEN_HOME",
    OPEN_BROWSE: "OPEN_BROWSE",
    OPEN_COMMUNITY: "OPEN_COMMUNITY",
    SEARCH_GAME: "SEARCH_GAME",
    SET_SORT_ORDER: "SET_SORT_ORDER"
}

const FILLER_PHRASES = [
    "please", 
    "could you",
    "can you",
    "would you", 
    "will you",
];


const normaliseTranscript = (text) => {
    console.log("Text before normalisation:", text)

    if (!text) return "";
    let normalisedTranscript = text.toLowerCase().trim();

    // Remove any filler phrases
    FILLER_PHRASES.forEach((phrase) => {
        normalisedTranscript = normalisedTranscript.replace(phrase, "").trim();
    })

    console.log("Transcript after normalisation:", normalisedTranscript);
    return normalisedTranscript;
}


export const detectIntent = (transcript, context = {}) => {
    const normalisedTranscript = normaliseTranscript(transcript);

    // Navigation to different pages
    if (normalisedTranscript.includes("browse")) {
        return {
            intent: INTENTS.OPEN_BROWSE,
            params: {}
        };
    }

    if (normalisedTranscript.includes("discover") || normalisedTranscript.includes("recommended" || normalisedTranscript.includes("recommendations") || normalisedTranscript.includes("recommendation"))) {
        return {
            intent: INTENTS.OPEN_DISCOVER,
            params: {}
        }
    }

    if (normalisedTranscript.includes("community") || normalisedTranscript.includes("communities")) {
        return {
            intent: INTENTS.OPEN_COMMUNITY,
            params: {}
        }
    }
}