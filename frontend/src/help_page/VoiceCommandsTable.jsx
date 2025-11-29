import "./help_page_styles.css";

function VoiceCommandsTable({ commands }) {
    return (
        <div className="voice-command-table">
            <table className="voice-table"> 
                <thead>
                    <tr>
                        <th>Command Name</th>
                        <th>Typical Spoken Command</th>
                    </tr>
                </thead>
                <tbody>
                    {commands.map((command) => (
                        <tr>
                            <td>{command.name}</td>
                            <td>{command.example}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VoiceCommandsTable;