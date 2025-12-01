import { fireEvent, render, screen, prettyDOM, getByPlaceholderText, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import Reviews from './Reviews.jsx';
import { user_info } from '../endpoints/api.js';
// Mock router 'useNavigate' and 'useParams'
const mockUseNavigate = vi.fn();
const mockUseParams = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockUseNavigate,
        useParams: () => mockUseParams(),
    };
});

// Mock user_info
vi.mock("../endpoints/api.js", () => ({
    user_info: vi.fn(),
}));

// mock axios
vi.mock("axios");

describe("tests for when a user is authenticated", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("check that option to create a post is there when a user is authenticated", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue({'email':'Tester@gmail.com'});
        axios.get.mockResolvedValue({ 'data': {
            'game': "F1 25",
            'parents': [
                {
                    'id': 1,
                    'gameId': 1,
                    'title': 'Best one yet!',
                    'message': 'This is potentially the best game I have ever played mate!',
                    'votes': 10,
                    'comments': 1,
                    'date': '2025-11-11T13:36:31.111000Z',
                    'firstname': 'Daiyan',
                    'surname': 'Khan',
                    'username': 'max_verstappen1',
                    'userVote': false
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {}});
        });
        expect(screen.getByTestId("add-btn")).toBeInTheDocument();
    });

    test("Ensure that authenticated users can like posts", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue({'email':'Tester@gmail.com'});
        axios.get.mockResolvedValue({ 'data': {
            'game': "F1 25",
            'parents': [
                {
                    'id': 1,
                    'gameId': 1,
                    'title': 'Best one yet!',
                    'message': 'This is potentially the best game I have ever played mate!',
                    'votes': 10,
                    'comments': 1,
                    'date': '2025-11-11T13:36:31.111000Z',
                    'firstname': 'Daiyan',
                    'surname': 'Khan',
                    'username': 'max_verstappen1',
                    'userVote': null
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {}});
        });
        // get the upvote button
        await userEvent.click(screen.getByTestId('upvote-btn'))
        // check that likes have gone up
        waitFor(() => {
            expect(screen.getByTestId('vote-count').textContent).toBe('11')
        });
        // screen.debug();

    });

    
});




// accessibility_tags
// : 
// []
// date_of_birth
// : 
// "2004-07-01"
// email
// : 
// "daiyankhan63@hotmail.com"
// first_name
// : 
// "Daiyan"
// genre_tags
// : 
// []
// is_moderator
// : 
// false
// last_name
// : 
// "Khan"
// username
// : 
// "dzam07"