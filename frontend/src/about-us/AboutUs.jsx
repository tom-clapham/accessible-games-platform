import "./about_us_styles.css";

function AboutUs() {
    return (
        <div className="about-us-page">
            <div className="about-us-section">
                <h1>Mission Statement</h1>
                <p>Our mission is to make game discovery fair, accessible and enjoyable to everyone, regardless of their ability, platform or background.</p>
                <p>We believe that every player deserves an equal opportunity to find games they'll love.</p>
            </div>

            <div className="about-us-separator"></div>

            <div className="about-us-section">
                <h1>The Problems We Solve</h1>
                <p>Built for gamers. By gamers.</p>
                <p>We ourselves have always felt the same frustrations players face today:</p>
                <ul>
                    <li className="about-us-list-item">It's hard to filter what <i>actually </i>matters to you as a player.</li>
                    <li className="about-us-list-item">Different platforms organise games poorly or hide them behind storefront clutter.</li>
                    <li className="about-us-list-item">Accessibility information is inconsistent or missing entirely.</li>
                    <li className="about-us-list-item">There's no centralised place to find trailers, tags, accessibility features together, leaving players to jump across multiple websites.</li>
                    <li className="about-us-list-item">Voice navigation and inclusive controls are rare across game discovery platforms.</li>
                </ul>
                <p>We ourselves have always felt the same frustrations players face today:</p>
            </div>

            <div className="about-us-separator"></div>

            <div className="about-us-section">
                <h1>What Makes Us Different</h1>
                <p>We focus on what modern players genuinely need:</p>
                <ul>
                    <li className="about-us-list-item"><b>Accessibility first discovery - </b>find games that support your requirements.</li>
                    <li className="about-us-list-item"><b>Rich filtering system - </b>search for and sort games by accessibility, genre, platform, price, release date and more.</li>
                    <li className="about-us-list-item"><b>Voice navigation system - </b>use the platform hands-free.</li>
                    <li className="about-us-list-item"><b>Clean, distraction free design - </b>no ads, no clutter, no manipulation</li>
                    <li className="about-us-list-item"><b>Sense of community - </b>post reviews to promote games and guide fellow players in the right direction.</li>
                </ul>
            </div>

            <div className="about-us-separator"></div>

            <div className="about-us-section">
                            <h1>The Team</h1>
            <p>We are a small but passionate group of developers who are building something big, one feature at a time.</p>
            <p>We build with:</p>
            <ul>
                <li className="about-us-list-item"><b>React </b>for a responsive and accessible UI.</li>
                <li className="about-us-list-item"><b>Django rest framework </b> for reliable and structured data.</li>
                <li className="about-us-list-item"><b>The commitment </b>to accessibility, inclusivity, and community-driven improvement.</li>
            </ul>
            </div>
        </div>
    )
}

export default AboutUs;