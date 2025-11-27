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
    // Navigation intent patterns
    {
        intent: INTENTS.OPEN_DISCOVER,
        keywords: ["discover", "recommended", "recommendation", "recommendations"]
    },
    {
        intent: INTENTS.OPEN_BROWSE,
        keywords: ["browse", "all games"]
    },
    {
        intent: INTENTS.OPEN_COMMUNITY,
        keywords: ["community", "communities"]
    },

    // Genre filtering intent patterns
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Racing",
        keywords: ["racing", "racer"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Action",
        keywords: ["action"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Adventure",
        keywords: ["adventure"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "RPG",
        keywords: ["rpg", "roleplaying", "role-playing"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Simulation",
        keywords: ["simulation", "simulator"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Sports",
        keywords: ["sports", "sport"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Platformer",
        keywords: ["platformer", "platform"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Horror",
        keywords: ["horror"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Shooter",
        keywords: ["shooter", "shooting"]
    },
    {
        intent: INTENTS.FILTER_BY_GENRE,
        genre: "Puzzle",
        keywords: ["puzzle"]
    },

    // Platform filtering intent patterns
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "PC",
        keywords: ["pc", "computer", "laptop"]
    },
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "PlayStation",
        keywords: ["playstation", "ps3", "ps4", "ps5"]
    },
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "Xbox",
        keywords: ["xbox"]
    },
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "Nintendo Switch",
        keywords: ["switch", "nintendo switch", "nintendo"]
    },
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "iOS",
        keywords: ["ios", "apple"]
    },
    {
        intent: INTENTS.FILTER_BY_PLATFORM,
        platform: "Android",
        keywords: ["android", "samsung"]
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

    // Pattern based intents: navigation & filtering
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