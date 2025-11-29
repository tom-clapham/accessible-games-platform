import "./help_page_styles.css"

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
                <p>You can use the Discover page to view the most trending games, games that are on sale, and newest releases.</p>
                <p>You can use the Browse page to view all games on our platform, and apply filters to tailor your searches.</p>
                <p>You can access the Game Profile of any game by clicking on its game card anywhere on the platform.</p>
                <p>You can find the user submitted reviews of any game by pressing the Reviews button at the bottom of every game's profile page.</p>
            </div>

            <div className="help-page-separator"></div>

            <div className="help-page-section">
                <h1>Filters Explained</h1>
                <p>As previously mentioned, you can apply filters on the Browse page to narrow down your searches.</p>

                <h2>Accessibility Tags</h2>
                <p>Explain tags</p>

                <h2>Genre Tags</h2>
                <p>Explain tags</p>

                <h2>Platform Tags</h2>
                <p>Explain tags</p>
            </div>
        </div>
    )
}

export default HelpPage;