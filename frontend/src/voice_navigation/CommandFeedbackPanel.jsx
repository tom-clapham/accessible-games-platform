import "./voice_controller_styles.css";

function CommandFeedbackPanel({ lastCommand }) {
    if (!lastCommand) return null;

    return (
        <div className="command-feedback-panel">
            <div className="command-feedback-row">
                <span className="command-feedback-label">Heard:</span>
                <span className="command-feedback-value">{lastCommand.transcript}</span>
            </div>

            <div className="command-feedback-row">
                <span className="command-feedback-label">Detected Command:</span>
                <span className="command-feedback-value">{lastCommand.intent}</span>
            </div>
        </div>
    );
}

export default CommandFeedbackPanel;