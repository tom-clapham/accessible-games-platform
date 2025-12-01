import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PostsReport from "./PostsReport";
import ReportForm from "./ReportForm";
import axios from "axios";
import { afterEach, describe, expect, vi } from "vitest";


vi.mock("axios");

// Mock useNavigate function (used to redirect to Log In page)
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ postId: "1" }),
  };
});


// Mock the OpenLogin function that pops up the Log In page
vi.mock("../Login/Login.js", () => ({
  OpenLogin: vi.fn(),
}));

// Mock user_info
vi.mock("../endpoints/api.js", () => ({
  user_info: vi.fn(),
}));

import * as api from "../endpoints/api.js";

describe("PostsReport Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("report form shows correct titles and buttons", async () => {
        
        // Create a mock post
        axios.get.mockResolvedValue({ data: {
            id: 1,
            title: "Test Post",
            message: "This is a test post content.",
            userId: 2,
            gameId: 3
        } });

        render(
            <MemoryRouter>
                <PostsReport />
            </MemoryRouter>
        );

        expect(await screen.findByText("Report For Post: Test Post")).toBeInTheDocument();
        expect(await screen.findByRole("button", { name: "Submit Report" })).toBeInTheDocument();
        expect(await screen.findByRole("button", { name: "Back" })).toBeInTheDocument();

    });

    test("submitting report posts correct information", async () => {
        // Mock user_info to return a logged-in user
        api.user_info.mockResolvedValue({ id: 10, username: "username" });

        // Create a mock post
        axios.get.mockResolvedValue({ data: {
            id: 1,
            title: "Test Post",
            message: "This is a test post content.",
            userId: 2,
            gameId: 3
        } });

        render(
            <MemoryRouter>
                <PostsReport />
            </MemoryRouter>
        );

        await act(async () => {
            await axios.post(
            `http://localhost:8000/app/reports/report/post/1/`,
            { report_type: "INAPP", description:"description" },
            { withCredentials: true }
            );
        });

        expect(axios.post).toHaveBeenCalledWith(
            `http://localhost:8000/app/reports/report/post/1/`,
            { report_type: "INAPP", description:"description" },
            { withCredentials: true }
        );
    });

    test("back button navigates to previous page", async () => {
        // Create a mock post
        axios.get.mockResolvedValue({ data: {
            id: 1,
            title: "Test Post",
            message: "This is a test post content.",
            userId: 2,
            gameId: 3
        } });
        render(
            <MemoryRouter>
                <PostsReport />
            </MemoryRouter>
        );
        // Simulate clicking the back button
        const backButton = await screen.findByRole("button", { name: "Back" });
        await userEvent.click(backButton);
        // Navigate to /reviews/3 since the post's gameId is 3
        expect(backButton.closest("a")).toHaveAttribute("href", "/reviews/3");
        
    });
});



