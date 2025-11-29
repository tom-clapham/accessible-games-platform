import { detectIntent, INTENTS } from "./intentMapping";

describe("detectIntent", () => {
    // Navigation intents tests
    test("testCorrectlyDetectsNavigationByOpeningDiscover", () => {
        const { intent, params } = detectIntent("go to discover page");

        expect(intent).toBe(INTENTS.OPEN_DISCOVER);
    });

    test("testCorrectlyDetectsNavigationByOpeningBrowse", () => {
        const { intent, params } = detectIntent("go to browse page");

        expect(intent).toBe(INTENTS.OPEN_BROWSE);
    });

    test("testCorrectlyDetectsNavigationByOpeningLogin", () => {
        const { intent, params } = detectIntent("go to login page");

        expect(intent).toBe(INTENTS.OPEN_LOGIN);
    });

    test("testCorrectlyDetectsNavigationByOpeningRegister", () => {
        const { intent, params } = detectIntent("go to register page");

        expect(intent).toBe(INTENTS.OPEN_REGISTER);
    });

    test("testCorrectlyDetectsNavigationByOpeningReviews", () => {
        const { intent, params } = detectIntent("go to reviews page");

        expect(intent).toBe(INTENTS.OPEN_REVIEWS);
    });

    test("testCorrectlyDetectsNavigationByOpeningGame", () => {
        const { intent, params } = detectIntent("open Super Mario 3");

        expect(intent).toBe(INTENTS.OPEN_GAME);
    });

    test("testCorrectlyDetectsNavigationByGoingBack", () => {
        const { intent, params } = detectIntent("go back to previous page");

        expect(intent).toBe(INTENTS.GO_BACK);
    });

    // Accessibility tags intents tests
    test("testCorrectlyDetectsFilterByAccessibilityForVision", () => {
        const { intent, params } = detectIntent("filter for vision accessibility games");

        expect(intent).toBe(INTENTS.FILTER_BY_ACCESSIBILITY);
        expect(params.accessibility).toBe("Vision Accessibility");
    });

    test("testCorrectlyDetectsFilterByAccessibilityForHearing", () => {
        const { intent, params } = detectIntent("filter for hearing accessibility games");

        expect(intent).toBe(INTENTS.FILTER_BY_ACCESSIBILITY);
        expect(params.accessibility).toBe("Hearing Accessibility");
    });

    test("testCorrectlyDetectsFilterByAccessibilityForSpeech", () => {
        const { intent, params } = detectIntent("filter for speech accessibility games");

        expect(intent).toBe(INTENTS.FILTER_BY_ACCESSIBILITY);
        expect(params.accessibility).toBe("Speech Accessibility");
    });

    test("testCorrectlyDetectsFilterByAccessibilityForMotor", () => {
        const { intent, params } = detectIntent("filter for motor accessibility games");

        expect(intent).toBe(INTENTS.FILTER_BY_ACCESSIBILITY);
        expect(params.accessibility).toBe("Motor Accessibility");
    });

    test("testCorrectlyDetectsFilterByAccessibilityForCognitive", () => {
        const { intent, params } = detectIntent("filter for cognitive accessibility games");

        expect(intent).toBe(INTENTS.FILTER_BY_ACCESSIBILITY);
        expect(params.accessibility).toBe("Cognitive Accessibility");
    });


    // Genre tags intents tests
    test("testCorrectlyDetectsFilterByGenreForRacing", () => {
        const { intent, params } = detectIntent("filter for racing games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Racing");
    });

    test("testCorrectlyDetectsFilterByGenreForAction", () => {
        const { intent, params } = detectIntent("filter for action games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Action");
    });

    test("testCorrectlyDetectsFilterByGenreForAdventure", () => {
        const { intent, params } = detectIntent("filter for adventure games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Adventure");
    });

    test("testCorrectlyDetectsFilterByGenreForRPG", () => {
        const { intent, params } = detectIntent("filter for rpg games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("RPG");
    });

    test("testCorrectlyDetectsFilterByGenreForSimulation", () => {
        const { intent, params } = detectIntent("filter for simulation games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Simulation");
    });

    test("testCorrectlyDetectsFilterByGenreForSports", () => {
        const { intent, params } = detectIntent("filter for sports games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Sports");
    });

    test("testCorrectlyDetectsFilterByGenreForPlatformer", () => {
        const { intent, params } = detectIntent("filter for platformer games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Platformer");
    });

    test("testCorrectlyDetectsFilterByGenreForHorror", () => {
        const { intent, params } = detectIntent("filter for horror games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Horror");
    });

    test("testCorrectlyDetectsFilterByGenreForShooter", () => {
        const { intent, params } = detectIntent("filter for shooter games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Shooter");
    });

    test("testCorrectlyDetectsFilterByGenreForPuzzle", () => {
        const { intent, params } = detectIntent("filter for puzzle games");

        expect(intent).toBe(INTENTS.FILTER_BY_GENRE);
        expect(params.genre).toBe("Puzzle");
    });


    // Platform tags intents tests
    test("testCorrectlyDetectsFilterByPlatformForComputer", () => {
         const { intent, params } = detectIntent("filter for computer games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("PC");
    })

    test("testCorrectlyDetectsFilterByPlatformForPlayStation", () => {
         const { intent, params } = detectIntent("filter for playstation games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("PlayStation");
    })

    test("testCorrectlyDetectsFilterByPlatformForXbox", () => {
         const { intent, params } = detectIntent("filter for xbox games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("Xbox");
    })

    test("testCorrectlyDetectsFilterByPlatformForNintendoSwitch", () => {
        const { intent, params } = detectIntent("filter for nintendo switch games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("Nintendo Switch");
    })

    test("testCorrectlyDetectsFilterByPlatformForiOS", () => {
        const { intent, params } = detectIntent("filter for iOS games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("iOS");
    })

    test("testCorrectlyDetectsFilterByPlatformForAndroid", () => {
        const { intent, params } = detectIntent("filter for android games");

        expect(intent).toBe(INTENTS.FILTER_BY_PLATFORM);
        expect(params.platform).toBe("Android");
    })

    test("testCorrectlyDetectsResetFilters", () => {
        const { intent, params } = detectIntent("reset filters");

        expect(intent).toBe(INTENTS.RESET_FILTERS);
    })


    // Scrolling intents tests
    test("testCorrectlyDetectsScrollByGoUp", () => {
        const { intent, params } = detectIntent("scroll up");

        expect(intent).toBe(INTENTS.SCROLL_UP);
    })

    test("testCorrectlyDetectsScrollByGoDown", () => {
        const { intent, params } = detectIntent("scroll down");

        expect(intent).toBe(INTENTS.SCROLL_DOWN);
    })

    test("testCorrectlyDetectsScrollByGoToTop", () => {
        const { intent, params } = detectIntent("scroll to top");

        expect(intent).toBe(INTENTS.GO_TO_TOP);
    })


    // Test for no commands detected
    test("testCorrectlyReturnsUndefinedWhenNoWordsMatchCommandWords", () => {
        const result = detectIntent("this is random and not a real command");

        expect(result).toBe(undefined);
    });
});