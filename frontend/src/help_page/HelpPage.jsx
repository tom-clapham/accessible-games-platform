import "./help_page_styles.css"
import VoiceCommandsTable from "./VoiceCommandsTable";
import { Link } from "react-router-dom";

function HelpPage() {
    return (
        <div className="help-page">
            <div className="help-page-section">
                <h1>Getting Started</h1>
                <p>Welcome to the Help page!</p>
                <p>Here you will find guidance on browsing games, using filters, voice navigation, and understanding how our platform works!</p>
            </div>

            <div className="help-page-separator"></div>

            <div className="help-page-section">
                <h1>Browsing & Searching</h1>
                <p>You can use the <Link to="/discover">Discover</Link> page to view the most trending games, games that are on sale, and newest releases.</p>
                <p>You can use the <Link to="/browse">Browse</Link> page to view all games on our platform, and apply filters to tailor your searches.</p>
                <p>You can access the Game Profile of any game by clicking on its game card anywhere on the platform.</p>
                <p>You can find the user submitted reviews of any game by pressing the Reviews button at the bottom of every game's profile page.</p>
            </div>

            <div className="help-page-separator"></div>

            <div className="help-page-section">
                <h1>Voice Navigation Guide</h1>

                <h2>Navigation Commands</h2>
                <VoiceCommandsTable
                    commands={[
                        { name: "Open Discover Page", example: "Go to discover page"},
                        { name: "Open Browse Page", example: "Go to browse page"},
                        { name: "Open Login Page", example: "Go to login page"},
                        { name: "Open Register Page", example: "Go to register page"},
                        { name: "Open About Us Page", example: "Go to about us page"},
                        { name: "Open Help Page", example: "Go to help page"},
                        { name: "Open Game", example: "Open [game name]"},
                        { name: "Open Reviews Page", example: "Go to reviews (*only when on game profile)"},
                        { name: "Go Back", example: "Go back"},
                        { name: "Scroll Up", example: "Scroll up"},
                        { name: "Scroll Down", example: "Scroll down"},
                        { name: "Go to Top", example: "Go to top"},
                    ]}
                />

                <h2>Filtering Commands</h2>
                <VoiceCommandsTable
                    commands={[
                        { name: "Filter by Accessibility Tags", example: "Filter for vision accessibility"},
                        { name: "Filter by Genre", example: "Filter for action"},
                        { name: "Filter by Platform", example: "Filter for playstation"},
                        { name: "Clear Filters", example: "Clear filters"},
                    ]}
                />

                <h2>Sorting Commands</h2>
                <VoiceCommandsTable
                    commands={[
                        { name: "Sort by Newest", example: "Sort by newest"},
                        { name: "Sort by Oldest", example: "Sort by oldest"},
                        { name: "Sort by Price (Low -> High)", example: "Sort by cheapest"},
                        { name: "Sort by Price (High -> Low)", example: "Sort by most expensive"},
                        { name: "Sort alphabetically (A -> Z)", example: "Sort alphabetically ascending"},
                        { name: "Sort alphabetically (Z -> A)", example: "Sort alphabetically descending"},
                    ]}
                />

                <h2>Voice Navigation Tips</h2>
                <ul>
                    <li className="help-page-list-item">Speak naturally.</li>
                    <li className="help-page-list-item">Use full game names for best accuracy.</li>
                    <li className="help-page-list-item">Reduce background noise.</li>
                    <li className="help-page-list-item">Ensure the microphone icon is glowing when active.</li>
                </ul>
            </div>
        </div>
    )
}

export default HelpPage;