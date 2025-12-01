import { mockDashboardRequests } from "./MockRequests";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router-dom";


mockDashboardRequests();

describe("Dashboard Text Content", () => {
    test("renders correct titles and button texts", async () => {
        render(<MemoryRouter><Dashboard /></MemoryRouter>);

        // Find title of the page
        expect(await screen.findByText("Moderator Dashboard")).toBeInTheDocument();
        // Find welcome subtitle
        expect(await screen.findByText("Welcome!")).toBeInTheDocument();
        // Find View Reports button
        expect(await screen.findByText("View Reports")).toBeInTheDocument();
        // Find View Publisher Requests button
        expect(await screen.findByText("View Publisher Requests")).toBeInTheDocument();
    })
});