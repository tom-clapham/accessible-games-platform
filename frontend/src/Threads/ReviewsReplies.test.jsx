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

describe("tests for reviews", () => {
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // get the upvote button
        await userEvent.click(screen.getByTestId('upvote-btn'))
        // check that likes have gone up
        expect(screen.getByTestId('vote-count').textContent).toBe('11')
        // screen.debug();
    });

    test("Ensure that authenticated users can dislike posts", async () => {
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // get the downvote button
        await userEvent.click(screen.getByTestId('downvote-btn'))
        // check that likes have gone down
        expect(screen.getByTestId('vote-count').textContent).toBe('9')
        // screen.debug();
    });

    test("If a user has disliked a post already, then the down vote button should be red", async () => {
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // check the down vote colour button
        expect(screen.getByTestId("downvote-btn").style.color).toBe('red')
    });

    test("If a user has liked a post already, then the up vote button should be blue", async () => {
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
                    'userVote': true
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // check the down vote colour button
        expect(screen.getByTestId("upvote-btn").style.color).toBe('rgb(0, 166, 255)')
    });

    test("If a user has already upvoted a post, when they click upvote, the count should go back down by one and the color should not be blue anymore", async () => {
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
                    'userVote': true
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        expect(screen.getByTestId('upvote-btn').style.color).toBe('rgb(0, 166, 255)')
        // get the upvote button
        await userEvent.click(screen.getByTestId('upvote-btn'))
        // check that likes have gone down
        expect(screen.getByTestId('vote-count').textContent).toBe('9')
        expect(screen.getByTestId('upvote-btn').style.color).not.toBe('rgb(0, 166, 255)')
    });

    test("If a user has already downvoted a post, when they click downvote, the count should go back up by 1 and the color should not be red anymore", async () => {
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // get colour before button click
        expect(screen.getByTestId('downvote-btn').style.color).toBe('red')
        // get the downvote button
        await userEvent.click(screen.getByTestId('downvote-btn'))
        console.log(screen.getByTestId('vote-count').textContent)
        // check that votes have gone up
        expect(screen.getByTestId('vote-count').textContent).toEqual('11')
        expect(screen.getByTestId('downvote-btn').style.color).not.toBe('red') // colour after button click
    });

    test("If a user has already upvoted a post, when they click downvote the count should go back down by 2 and the downvote button color should be red", async () => {
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
                    'userVote': true
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // get colour before button click
        expect(screen.getByTestId('upvote-btn').style.color).toBe('rgb(0, 166, 255)')
        // get the downvote button
        await userEvent.click(screen.getByTestId('downvote-btn'))
        // check that likes have gone up
        expect(screen.getByTestId('vote-count').textContent).toBe('8')
        // colour after button click
        expect(screen.getByTestId('downvote-btn').style.color).toBe('red')
        expect(screen.getByTestId('upvote-btn').style.color).not.toBe('rgb(0, 166, 255)')
    });

    test("If a user has already downvoted a post, when they click upvote the count should go back up by 2 and the upvote button color should be blue", async () => {
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // get colour before button click
        expect(screen.getByTestId('downvote-btn').style.color).toBe('red')
        // get the upvote button
        await userEvent.click(screen.getByTestId('upvote-btn'))
        // check that likes have gone up
        expect(screen.getByTestId('vote-count').textContent).toBe('12')
        // colour after button click
        expect(screen.getByTestId('downvote-btn').style.color).not.toBe('red')
        expect(screen.getByTestId('upvote-btn').style.color).toBe('rgb(0, 166, 255)')
    });

    test("If a user is logged in, they should be able to creaete a post", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue({'email':'Tester@gmail.com'});
        axios.post.mockResolvedValue();
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
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {"userEmail":"Tester@gmail.com"}});
        });
        // click the post button
        await userEvent.click(screen.getByTestId('add-btn'));
        // type title
        await userEvent.type(screen.getByTestId("modal-input"), "This is the new title");
        // type message
        await userEvent.type(screen.getByTestId("modal-text-area"), "This is the new message");
        // click the modal post button
        await userEvent.click(screen.getByTestId('modal-post'));
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/new-post/",
            {
                'gameId': '1',
                'userEmail': 'Tester@gmail.com',
                'title': "This is the new title",
                'message': "This is the new message"
            },
            { 'withCredentials': true}
        );

    });

    test("If a user is not logged in, they should not have the option to create a post", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue(false);
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
                    'username': 'max_verstappen1'
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {}});
        });
        expect(screen.queryByTestId("add-btn")).not.toBeInTheDocument();
    });

    test("If a user is not logged in, they should not be able to like a post", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue(false);
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
                    'username': 'max_verstappen1'
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {}});
        });
        // simulate upvote click
        await userEvent.click(screen.getByTestId("upvote-btn"))
        // check that colour is not blue
        expect(screen.getByTestId('upvote-btn').style.color).not.toBe('rgb(0, 166, 255)')
    });

    test("If a user is not logged in, they should not be able to dislike a post", async () => {
        mockUseParams.mockReturnValue({'reviewId': '1'}) // setting the useParams
        user_info.mockResolvedValue(false);
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
                    'username': 'max_verstappen1'
                }
            ]
        } }) // Setting up the initial axios call
        render(<MemoryRouter><Reviews /></MemoryRouter>)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/app/threads/reviews/1/",  {params: {}});
        });
        // simulate upvote click
        await userEvent.click(screen.getByTestId("downvote-btn"))
        // check that colour is not blue
        expect(screen.getByTestId('downvote-btn').style.color).not.toBe('red')
    });

});