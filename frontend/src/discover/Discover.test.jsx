import { render, screen } from "@testing-library/react";
import axios from "axios";
import Discover from "./Discover.jsx";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, test, vi } from "vitest";


vi.mock("axios");
describe("Discover Component", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("correct titles are shown", async () => {
        // Mock empty games so I do not get undefined reading
        const mockData = {
            trending_games: [],
            on_sale_games: [],
            recently_released_games: []
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(
            <MemoryRouter>
                <Discover />
            </MemoryRouter>
        );

        expect(await screen.findByText("Trending")).toBeInTheDocument();
        expect(await screen.findByText("On-Sale")).toBeInTheDocument();
        expect(await screen.findByText("Latest Releases")).toBeInTheDocument();
    })

    test("if there are no trending games and no on-sale games then show the correct message", async () => {
        // Empty games
        const mockData = {
            trending_games: [],
            on_sale_games: [],
            recently_released_games: []
        };
        vi.clearAllMocks();
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter><Discover /></MemoryRouter>);
        // Expected messages when there are no trending games or on-sale games to display
        expect(await screen.findByText("No games are currently trending...")).toBeInTheDocument();
        expect(await screen.findByText("No games are currently on sale...")).toBeInTheDocument();
    })

    test("displays trending games when there are trending games", async () => {
        const mockData = {
            trending_games: [
                { id: 1, name: "Trending Game test" },
            ],
            on_sale_games: [],
            recently_released_games: []
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter><Discover /></MemoryRouter>);
        expect(await screen.findByText("Trending Game test")).toBeInTheDocument();
    })

    test("displays on-sale games when there are on-sale games", async () => {
        const mockData = {
            trending_games: [],
            on_sale_games: [
                { id: 2, name: "On-Sale Game Test" },
            ],
            recently_released_games: []
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter><Discover /></MemoryRouter>);
        expect(await screen.findByText("On-Sale Game Test")).toBeInTheDocument();
    })

    test("displays recently released games when there are recently released games", async () => {
        const mockData = {
            trending_games: [],
            on_sale_games: [],
            recently_released_games: [
                { id: 3, name: "Recently Released Game Test" },
            ]
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter><Discover /></MemoryRouter>);
        expect(await screen.findByText("Recently Released Game Test")).toBeInTheDocument();
    })

    test("trending games only shows eight games", async () => {
        const mockData = {
            trending_games: [
                { id: 1, name: "Game 1" },
                { id: 2, name: "Game 2" },
                { id: 3, name: "Game 3" },
                { id: 4, name: "Game 4" },
                { id: 5, name: "Game 5" },
                { id: 6, name: "Game 6" },
                { id: 7, name: "Game 7" },
                { id: 8, name: "Game 8" },
                // Game 9 to test limit
                { id: 9, name: "Game 9" },
            ],
            on_sale_games: [],
            recently_released_games: []
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter>
            <Discover />
            </MemoryRouter>);
        expect(await screen.queryByText("Game 9")).not.toBeInTheDocument();
    })

    test("on-sale games only shows eight games", async () => {
        const mockData = {
            trending_games: [],
            on_sale_games: [
                { id: 1, name: "Game 1" },
                { id: 2, name: "Game 2" },
                { id: 3, name: "Game 3" },
                { id: 4, name: "Game 4" },
                { id: 5, name: "Game 5" },
                { id: 6, name: "Game 6" },
                { id: 7, name: "Game 7" },
                { id: 8, name: "Game 8" },
                { id: 9, name: "Game 9" },
            ],
            recently_released_games: []
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter>
            <Discover />
            </MemoryRouter>);
        expect(await screen.queryByText("Game 9")).not.toBeInTheDocument();
    })

    test("recently released games only shows eight games", async () => {
        const mockData = {
            trending_games: [],
            on_sale_games: [],
            recently_released_games: [
                { id: 1, name: "Game 1" },
                { id: 2, name: "Game 2" },
                { id: 3, name: "Game 3" },
                { id: 4, name: "Game 4" },
                { id: 5, name: "Game 5" },
                { id: 6, name: "Game 6" },
                { id: 7, name: "Game 7" },
                { id: 8, name: "Game 8" },
                { id: 9, name: "Game 9" },
            ]
        };
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter>
            <Discover />
            </MemoryRouter>);
        expect(await screen.queryByText("Game 9")).not.toBeInTheDocument();
    })

});
