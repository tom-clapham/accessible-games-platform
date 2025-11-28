import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VoiceController from "./VoiceController";

describe("VoiceController component", () => {
    test("testToEnsureRendersMicButtonAndCommandFeedbackToggleButton", () => {
        render(
            <MemoryRouter>
                <VoiceController />
            </MemoryRouter>
        );

        // Mic button
        const micButton = screen.getByRole("button", {
            name: /Turn on voice navigation/i,
        });
        expect(micButton).toBeInTheDocument();

        // Command feedback toggle button (the arrow)
        const feedbackToggle = screen.getByRole("button", {
            name: /Show command feedback/i, 
        });
        expect(feedbackToggle).toBeInTheDocument();
    });
});