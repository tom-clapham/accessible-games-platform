import { fireEvent, render, screen, prettyDOM, getByPlaceholderText, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';

import SearchBarNav from './SearchBarNav.jsx';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockUseNavigate,
    };
});

describe("Publishing new game component", () => {
    // Setting up mock axios
    vi.mock("axios");
    beforeEach(() => {
        vi.clearAllMocks();

    });

    test("Should show all games from axios call on click of search bar", async () => {
        // Setting up the fake results from the axios call
        render(<BrowserRouter><SearchBarNav/></BrowserRouter>);
        axios.get.mockResolvedValue({ 
            status:200,
            data: [
                {'accessiblity_tags':['Hearing Accessibility', 'Cognitive Accessibility'], 'name':"Elden Ring", 'platform_tags': ['PC', 'PlayStation', 'Xbox'], 'price':59.99, 'profile':2, 'thumbnail_url':"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546"}
            ]
        });
        await userEvent.click(screen.getByPlaceholderText("Search apps, games and more..."));
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/games/search", {params: {"name": ""}});
        });
        expect(screen.getByText("Elden Ring")).toBeInTheDocument();
    });
    
    test("Should be a message if there is nothing to display", async () => {
        render(<BrowserRouter><SearchBarNav/></BrowserRouter>);
        axios.get.mockResolvedValue({
            status: 200,
            data: []
        });
        await userEvent.click(screen.getByPlaceholderText("Search apps, games and more..."));
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/games/search", {params: {"name": ""}});
        });
        expect(screen.getByText("Nothing to display :/")).toBeInTheDocument();
    });

    test("Should navigate to the game page on click", async () => {
        // Setting up the fake results from the axios call
        render(<BrowserRouter><SearchBarNav/></BrowserRouter>);
        axios.get.mockResolvedValue({ 
            status:200,
            data: [
                {'accessiblity_tags':['Hearing Accessibility', 'Cognitive Accessibility'], 'name':"Elden Ring", 'platform_tags': ['PC', 'PlayStation', 'Xbox'], 'price':59.99, 'profile':2, 'thumbnail_url':"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546"}
            ]
        });
        await userEvent.click(screen.getByPlaceholderText("Search apps, games and more..."));
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/games/search", {params: {"name": ""}});
        });
        expect(screen.getByText("Elden Ring")).toBeInTheDocument();
        await userEvent.click(screen.getByText("Elden Ring")) // simulate clicking on the game
        await waitFor(() => {
            expect(mockUseNavigate('/gameprofile/2')); // expect user to navigate to the profile for elden ring
        })
    });
});