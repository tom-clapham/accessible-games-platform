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
    test("if there are no trending games and no on-sale games then show the correct message", async () => {
        const mockData = {
            trending_games: [],
            on_sale_games: [],
            recently_released_games: []
        };
        vi.clearAllMocks();
        axios.get.mockResolvedValue({ data: mockData });
        render(<MemoryRouter><Discover /></MemoryRouter>);
        expect(await screen.findByText("No games are currently trending...")).toBeInTheDocument();
        expect(await screen.findByText("No games are currently on sale...")).toBeInTheDocument();
    }



    )
});
