import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VoiceController from "./VoiceController";
import CommandFeedbackPanel from "./CommandFeedbackPanel";


class MockSpeechRecognition {
    constructor() {
        this.continuous = false;
        this.language = "en-GB";
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
        this.onresult = null;
    }

    start() {
        // Call onstart like the real browser would
        if (this.onstart) {
            this.onstart();
        }
    }

    stop() {
        // Call on end
        if (this.onend) {
            this.onend();
        }
    }
}


beforeAll(() => {
    // Attach mock speed recognition to window
    window.SpeechRecognition = MockSpeechRecognition;
    window.webkitSpeechRecognition = MockSpeechRecognition;
})


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

    test("TestEnsureMicButtonTogglesBetweenMicOffAndOnIcons", () => {
        render(
            <MemoryRouter>
                <VoiceController />
            </MemoryRouter>
        );

        const micButton = screen.getByRole("button", {
            name: /Turn on voice navigation/i,
        });

        // Initially mic should have the off icon
        expect(micButton).toBeInTheDocument();
        expect(micButton).toHaveAttribute(
            "aria-label",
            "Turn on voice navigation"
        );
        expect(micButton.className).not.toContain("listening");

        // Click to enable voice
        fireEvent.click(micButton);

        // Now mic should have the on icon
        expect(micButton).toHaveAttribute(
            "aria-label",
            "Turn off voice navigation"
        );
        expect(micButton.className).toContain("listening");
    });

    test("testShowsTranscriptAndIntentWhenLastCommandIsProvided", () => {
    render(
        <CommandFeedbackPanel
            lastCommand={{
                transcript: "open elden ring",
                intent: "OPEN_GAME",
                params: { gameName: "elden ring" },
            }}
        />
    );

    expect(screen.getByText(/Heard:/i)).toBeInTheDocument();
    expect(screen.getByText(/open elden ring/i)).toBeInTheDocument();
    expect(screen.getByText(/Detected Command:/i)).toBeInTheDocument();
    expect(screen.getByText(/OPEN_GAME/i)).toBeInTheDocument();
});
});