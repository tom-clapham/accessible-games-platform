import { fireEvent, render, screen, prettyDOM, getByPlaceholderText } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';

import PublisherNewGame from './PublisherNewGame.jsx';

describe("Publishing new game component", () => {
    test("should show the preview page onClick of the preview button", async () => {
        render(<PublisherNewGame/>)
        // screen.debug()
        const preview_btn = screen.getByTestId('preview-btn')
        await userEvent.click(preview_btn)
        // screen.debug()
        expect(screen.getByText('Add to favourite games')).toBeInTheDocument;
    });

    test("Should show the edit page onClick of the edit button", async () => {
        render(<PublisherNewGame/>)
        // screen.debug()
        const preview_btn = screen.getByTestId('preview-btn')
        await userEvent.click(preview_btn)
        const edit_btn = screen.getByTestId('edit-btn')
        await userEvent.click(edit_btn)
        // screen.debug()
        expect(screen.getByText('Create')).toBeInTheDocument;
    });

    test("Should show input game name in the preview page", async () => {
        render(<PublisherNewGame/>);
        // screen.debug();
        await userEvent.type(screen.getByPlaceholderText("Name..."), "New Test Game!");
        // screen.debug()
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-title')).toBeInTheDocument;
        expect(document.getElementsByClassName('gp-title').item(0).textContent).toBe("New Test Game!");
    });

    test("Empty game name input should be invalid", () => {
        render(<PublisherNewGame/>);
        expect(screen.getByPlaceholderText('Name...')).not.toBeValid()
    });

    test("Should show input description in the preview page", async () => {
        render(<PublisherNewGame/>);
        // screen.debug();
        await userEvent.type(screen.getByPlaceholderText("Description..."), "Test description!");
        // screen.debug()
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-description')).toBeInTheDocument;
        expect(document.getElementsByClassName('gp-description').item(0).textContent).toBe("Test description!");
    });

    test("Empty description input should be invalid", () => {
        render(<PublisherNewGame/>);
        expect(screen.getByPlaceholderText('Description...')).not.toBeValid()
    });

    test("Empty price should show as free in preview", async () => {
        render(<PublisherNewGame/>);
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-price').item(0).textContent).toBe("Free");
    });

    test("Price of 0 should show as free in preview", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "0");
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-price').item(0).textContent).toBe("Free");
    });

    test("Price of 0.00 should show as free in preview", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "0.00");
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-price').item(0).textContent).toBe("Free");
    });
    
    test("Non-zero price should show as £<price> in preview", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "49.99");
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(document.getElementsByClassName('gp-price').item(0).textContent).toBe("£49.99");
    });

    test("Input release date should be reflected in preview", async () => {
        render(<PublisherNewGame/>);
        screen.getByTestId
        await userEvent.type(screen.getByTestId("release-date"), "2024-11-11");
        await userEvent.click(screen.getByTestId('preview-btn'));
        expect(screen.findByText("11/11/2024")).toBeInTheDocument;
    });

    test("Empty release date input should be invalid", () => {
        render(<PublisherNewGame/>);
        expect(screen.getByTestId("release-date")).not.toBeValid();
    });

    test("Non URL trailer inputs should not be valid", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByTestId("trailer-url"), "Non url input")
        expect(screen.getByTestId("trailer-url")).not.toBeValid();
    });

    test("URL trailer inputs should be valid", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByTestId("trailer-url"), "https://www.google.com");
        expect(screen.getByTestId("trailer-url")).toBeValid();
    });

    test("Non URL thumbnail inputs should not be valid", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByTestId("thumbnail-url"), "Non url input")
        expect(screen.getByTestId("thumbnail-url")).not.toBeValid();
    });

    test("URL thumbnail inputs should be valid", async () => {
        render(<PublisherNewGame/>);
        await userEvent.type(screen.getByTestId("thumbnail-url"), "https://www.google.com");
        expect(screen.getByTestId("thumbnail-url")).toBeValid();
    });
});

vi.mock('axios');

describe("Handling the API calls for publishing new games", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Testing successful post request when required form information is filled", async () => {
        render(<PublisherNewGame/>);
        axios.post.mockResolvedValue({ status:201 })
        await userEvent.type(screen.getByPlaceholderText("Name..."), "New Test Game!")
        await userEvent.type(screen.getByPlaceholderText("Description..."), "Test description!");
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "49.99");
        await userEvent.type(screen.getByTestId("release-date"), "2024-11-11");
        await userEvent.type(screen.getByTestId("trailer-url"), "https://www.google.com");
        await userEvent.type(screen.getByTestId("thumbnail-url"), "https://www.google.com");
        await userEvent.click(screen.getByText("Create"));
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/app/games/upload/", {
            "accessibilityTags": [],
            "description": "Test description!",
            "gameName": "New Test Game!",
            "genreTags": [],
            "platformTags": [],
            "price": "49.99",
            "releaseDate": "2024-11-11",
            "thumbnailUrl": "https://www.google.com",
            "trailerUrl": "https://www.google.com"
       })
       expect(screen.getByText("Success!")).toBeInTheDocument;
    });

    test("Testing unsuccessful post request when price is not in a valid format", async () => {
        render(<PublisherNewGame/>);
        axios.post.mockRejectedValue({
            status: 400,
            name: "AxiosError",
            response: {
                data: {price: 'Ensure that there are no more than 4 digits in total.'},
                status: 400
            }
        })
        await userEvent.type(screen.getByPlaceholderText("Name..."), "New Test Game!")
        await userEvent.type(screen.getByPlaceholderText("Description..."), "Test description!");
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "49.109");
        await userEvent.type(screen.getByTestId("release-date"), "2024-11-11");
        await userEvent.type(screen.getByTestId("trailer-url"), "https://www.google.com");
        await userEvent.type(screen.getByTestId("thumbnail-url"), "https://www.google.com");
        await userEvent.click(screen.getByText("Create"));
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/app/games/upload/", {
            "accessibilityTags": [],
            "description": "Test description!",
            "gameName": "New Test Game!",
            "genreTags": [],
            "platformTags": [],
            "price": "49.109",
            "releaseDate": "2024-11-11",
            "thumbnailUrl": "https://www.google.com",
            "trailerUrl": "https://www.google.com"
       })
    //    screen.debug();
       expect(screen.getByText("Issue with price - Ensure that there are no more than 4 digits in total.")).toBeInTheDocument;
    });

    test("Test that all input fields are cleared on successful post request", async () => {
        render(<PublisherNewGame/>);
        // Test that post was successful
        axios.post.mockResolvedValue({ status:201 })
        await userEvent.type(screen.getByPlaceholderText("Name..."), "New Test Game!")
        await userEvent.type(screen.getByPlaceholderText("Description..."), "Test description!");
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "49.99");
        await userEvent.type(screen.getByTestId("release-date"), "2024-11-11");
        await userEvent.type(screen.getByTestId("trailer-url"), "https://www.google.com");
        await userEvent.type(screen.getByTestId("thumbnail-url"), "https://www.google.com");
        await userEvent.click(screen.getByText("Create"));
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/app/games/upload/", {
            "accessibilityTags": [],
            "description": "Test description!",
            "gameName": "New Test Game!",
            "genreTags": [],
            "platformTags": [],
            "price": "49.99",
            "releaseDate": "2024-11-11",
            "thumbnailUrl": "https://www.google.com",
            "trailerUrl": "https://www.google.com"
       })
       expect(screen.getByText("Success!")).toBeInTheDocument;
       // test that fields are now clear
       expect(screen.getByPlaceholderText("Name...").value).toBe("");
       expect(screen.getByPlaceholderText("Description...").value).toBe("");
       expect(screen.getByTestId("release-date").value).toBe("");
       expect(screen.getByPlaceholderText("Price in GBP...").value).toBe("");
       expect(screen.getByTestId("trailer-url").value).toBe("");
       expect(screen.getByTestId("thumbnail-url").value).toBe("");
    });

    test("Test inputs aren't cleared on unsuccessful post request", async () => {
        render(<PublisherNewGame/>);
        axios.post.mockRejectedValue({
            status: 400,
            name: "AxiosError",
            response: {
                data: {price: 'Ensure that there are no more than 4 digits in total.'},
                status: 400
            }
        })
        await userEvent.type(screen.getByPlaceholderText("Name..."), "New Test Game!")
        await userEvent.type(screen.getByPlaceholderText("Description..."), "Test description!");
        await userEvent.type(screen.getByPlaceholderText("Price in GBP..."), "49.109");
        await userEvent.type(screen.getByTestId("release-date"), "2024-11-11");
        await userEvent.type(screen.getByTestId("trailer-url"), "https://www.google.com");
        await userEvent.type(screen.getByTestId("thumbnail-url"), "https://www.google.com");
        await userEvent.click(screen.getByText("Create"));
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/app/games/upload/", {
            "accessibilityTags": [],
            "description": "Test description!",
            "gameName": "New Test Game!",
            "genreTags": [],
            "platformTags": [],
            "price": "49.109",
            "releaseDate": "2024-11-11",
            "thumbnailUrl": "https://www.google.com",
            "trailerUrl": "https://www.google.com"
       })
    //    screen.debug();
       expect(screen.getByText("Issue with price - Ensure that there are no more than 4 digits in total.")).toBeInTheDocument;
       // Test fields are not cleared
       expect(screen.getByPlaceholderText("Name...").value).toBe("New Test Game!");
       expect(screen.getByPlaceholderText("Description...").value).toBe("Test description!");
       expect(screen.getByTestId("release-date").value).toBe("2024-11-11");
       expect(screen.getByPlaceholderText("Price in GBP...").value).toBe("49.109");
       expect(screen.getByTestId("trailer-url").value).toBe("https://www.google.com");
       expect(screen.getByTestId("thumbnail-url").value).toBe("https://www.google.com");
    });

});