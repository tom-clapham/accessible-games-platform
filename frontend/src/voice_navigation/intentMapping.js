export const INTENTS = {
    OPEN_DISCOVER: "OPEN_DISCOVER",
    OPEN_BROWSE: "OPEN_BROWSE",
    OPEN_COMMUNITY: "OPEN_COMMUNITY",
    OPEN_GAME: "OPEN_GAME",

    SET_SORT_ORDER: "SET_SORT_ORDER",
    FILTER_BY_GENRE: "FILTER_BY_GENRE",
    FILTER_BY_PLATFORM: "FILTER_BY_PLATFORM",
    FILTER_BY_ACCESSIBILITY: "FILTER_BY_ACCESSIBILITY",
    CLEAR_FILTERS: "CLEAR_FILTERS",
}


export const INTENT_PATTERNS = [
    {
        intent: INTENTS.OPEN_DISCOVER,
        keywords: ["discover", "recommended", "recommendation", "recommendations"]
    },
    {
        intent: INTENTS.OPEN_BROWSE,
        keywords: ["browse"]
    },
    {
        intent: INTENTS.OPEN_COMMUNITY,
        keywords: ["community", "communities"]
    },
]


const FILLER_PHRASES = [
    "please", 
    "could you",
    "can you",
    "would you", 
    "will you",
];


const transcriptMatchesIntentKeywords = (transcript, keywords) => {
    // Check if transcript has any of the provided intent's keywords
    for (const keyword of keywords) {
        if (transcript.includes(keyword)) {
            return true;
        }
    }
    
    return false;
}


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

    // Check if command transcript matches ANY intent patterns
    for (const pattern of INTENT_PATTERNS) {
        if (transcriptMatchesIntentKeywords(normalisedTranscript, pattern.keywords)) {
            const { intent, keywords, ...rest } = pattern;

            return {
                intent,
                params: { ...rest }
            };
        }
    }
}