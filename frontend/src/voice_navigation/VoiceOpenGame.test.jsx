import { describe, beforeEach, afterEach, expect, vi } from "vitest";
import { openGameByName } from "./VoiceController";

describe("openGameByName", () => {
    // Mock games to use for tests
    const mockGames = [
        { id: 1, name: "Baldur's Gate 3" },
        { id: 2, name: "Hades" },
        { id: 3, name: "Terraria"},
    ];

    let mockNavigate;

    beforeEach(() => {
        // Mock the navigate
        mockNavigate = vi.fn();

        // Mock the fetch to return all the mocked games
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockGames),
        });
    });
    
    // Clear mocks after each test
    afterEach(() => {
        vi.clearAllMocks();
    });

    // In each test, pretend that speech recognition could not pick up the exact game name, something similar

    test("testSuccessfullyNavigatesToClosestMatchingGameForFuzzySpokenName1", async () => {
        await openGameByName("boulders gate 3", mockNavigate);

        // Ensure the function fetches all games and routes to correct game profile
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/app/games/games");
        expect(mockNavigate).toHaveBeenCalledWith("/gameprofile/1"); 
    });

    test("testSuccessfullyNavigatesToClosestMatchingGameForFuzzySpokenName2", async () => {
        await openGameByName("terror ya", mockNavigate);

        // Ensure the function fetches all games and routes to correct game profile
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/app/games/games");
        expect(mockNavigate).toHaveBeenCalledWith("/gameprofile/3"); 
    });

    test("testSuccessfullyNavigatesToClosestMatchingGameForFuzzySpokenName3", async () => {
        await openGameByName("haydees", mockNavigate);

        // Ensure the function fetches all games and routes to correct game profile
        expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/app/games/games");
        expect(mockNavigate).toHaveBeenCalledWith("/gameprofile/2"); 
    });

    test("testDoesNothingWhenNoCloseEnoughSoundingGameIsFound", async () => {
        // Simulate an empty list
        fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue([]),
        });

        await openGameByName("some completely unknown game that does not exist", mockNavigate);
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
