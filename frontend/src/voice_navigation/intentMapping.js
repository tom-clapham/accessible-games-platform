export const INTENTS = {
    OPEN_DISCOVER: "OPEN_HOME",
    OPEN_BROWSE: "OPEN_BROWSE",
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

function normaliseCommand(text) {
    console.log("Text before normalisation:", text)

    if (!text) return "";
    let normalisedText = text.toLowerCase().trim();

    // Remove any filler phrases
    FILLER_PHRASES.forEach((phrase) => {
        normalisedText = normalisedText.replace(phrase, "").trim();
    })

    console.log("Text after normalisation:", normalisedText);
}