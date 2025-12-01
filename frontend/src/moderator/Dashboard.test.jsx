import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");

// Mock user_info
vi.mock("../endpoints/api.js", () => ({
  user_info: vi.fn(),
}));

import * as api from "../endpoints/api.js";

// Mocking the useNavigate() function
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Dashboard Text Content", () => {

    test("renders correct titles and buttons", async () => {
        // Mock moderator user
        api.user_info.mockResolvedValueOnce({ is_moderator: true });

        // Mock dashboard reports
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<MemoryRouter><Dashboard /></MemoryRouter>);

        // Find title of the page
        expect(await screen.findByText("Moderator Dashboard")).toBeInTheDocument();
        // Find welcome subtitle
        expect(await screen.findByText("Welcome!")).toBeInTheDocument();
        // Find View Reports button
        expect(await screen.findByText("View Reports")).toBeInTheDocument();
        // Find View Publisher Requests button
        expect(await screen.findByText("View Publisher Requests")).toBeInTheDocument();
    });

    test("renders no recent reports message when there are no reports", async () => {
        api.user_info.mockResolvedValueOnce({ is_moderator: true });
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<MemoryRouter><Dashboard /></MemoryRouter>);
        expect(await screen.findByText("No available options")).toBeInTheDocument();
    });

    test("renders recent reports when they exist", async () => {
        api.user_info.mockResolvedValueOnce({ is_moderator: true });

        const mockReports = [
            {
                id: 1,
                reviewed_at: "2024-06-01T12:00:00Z",
                review_reason: "Inappropriate content",
                report_id: 1,
                reviewed_by_id: 2,
                review_action: "Content Removed"
            }
        ];
        axios.get.mockResolvedValueOnce({ data: mockReports });

        render(<MemoryRouter><Dashboard /></MemoryRouter>);
        // Check that the report reason is displayed (easiest to verify)
        expect(await screen.findByText("Inappropriate content")).toBeInTheDocument();
    });

    test("regular registered user is unable to access moderator dashboard", async () => {
        api.user_info.mockResolvedValueOnce({ is_moderator: false });
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<MemoryRouter><Dashboard /></MemoryRouter>);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/discover");
        });
    });

    test("non-logged in user is unable to access moderator dashboard", async () => {
        api.user_info.mockRejectedValueOnce({ response: { status: 401 } });
        axios.get.mockResolvedValueOnce({ data: [] });

        render(<MemoryRouter><Dashboard /></MemoryRouter>);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/discover");
        });
    });

});
