export const INTENTS = {
    OPEN_DISCOVER: "OPEN_DISCOVER",
    OPEN_BROWSE: "OPEN_BROWSE",
    OPEN_GAME: "OPEN_GAME",
    GO_BACK: "GO_BACK",

    SET_SORT_ORDER: "SET_SORT_ORDER",
    FILTER_BY_GENRE: "FILTER_BY_GENRE",
    FILTER_BY_PLATFORM: "FILTER_BY_PLATFORM",
    FILTER_BY_ACCESSIBILITY: "FILTER_BY_ACCESSIBILITY",
    RESET_FILTERS: "RESET_FILTERS",

    SCROLL_UP: "SCROLL_UP",
    SCROLL_DOWN: "SCROLL_DOWN",
    GO_TO_TOP: "GO_TO_TOP",
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
        intent: INTENTS.OPEN_GAME,
        keywords: ["open"],
    },
    {
        intent: INTENTS.GO_BACK,
        keywords: ["back", "previous"]
    },

    // Scrolling intent patterns
    {
        intent: INTENTS.SCROLL_UP,
        keywords: ["up"],
    },
    {
        intent: INTENTS.SCROLL_DOWN,
        keywords: ["down"],
    },
    {
        intent: INTENTS.GO_TO_TOP,
        keywords: ["top"],
    },

    // Genre filtering intent patterns
    {
        intent: INTENTS.RESET_FILTERS,
        keywords: ["reset", "clear", "remove", "delete"]
    },

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
        keywords: ["rpg", "role", "role-playing"]
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

    // Accessibility tag filtering intent patterns
    {
        intent: INTENTS.FILTER_BY_ACCESSIBILITY,
        accessibility: "Vision Accessibility",
        keywords: ["vision", "visual", "blind"]
    },
    {
        intent: INTENTS.FILTER_BY_ACCESSIBILITY,
        accessibility: "Hearing Accessibility",
        keywords: ["hearing", "audio", "deaf"]
    },
    {
        intent: INTENTS.FILTER_BY_ACCESSIBILITY,
        accessibility: "Speech Accessibility",
        keywords: ["speech", "speaking"]
    },
    {
        intent: INTENTS.FILTER_BY_ACCESSIBILITY,
        accessibility: "Motor Accessibility",
        keywords: ["motor", "dexterity"]
    },
    {
        intent: INTENTS.FILTER_BY_ACCESSIBILITY,
        accessibility: "Cognitive Accessibility",
        keywords: ["cognitive"]
    },

    // Sorting intent patterns
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "nameAscending",
        keywords: ["ascending"]
    },
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "nameDescending",
        keywords: ["descending"]
    },
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "priceLowestToHighest",
        keywords: ["lowest", "cheapest"]
    },
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "priceHighestToLowest",
        keywords: ["highest", "expensive"]
    },
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "releaseNewestToOldest",
        keywords: ["newest"]
    },
    {
        intent: INTENTS.SET_SORT_ORDER,
        sort: "releaseOldestToNewest",
        keywords: ["oldest"]
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

    // Pattern based intents: navigation, filtering, sorting
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