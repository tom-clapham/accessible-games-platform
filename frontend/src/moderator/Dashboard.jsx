import axios from 'axios';
import { useEffect, useState } from 'react';
import './Moderator.css';
import { Link } from 'react-router-dom';



function Dashboard() {
    return (
        <div className="mod-container">
            <div className="mod-title">
                <h1>Moderator Dashboard</h1>
            </div>

            <div className="mod-welcome-title">
                <h2>Welcome Moderator_Name!</h2>
            </div>

            <div className="mod-side-grid">
                <Link to={`/moderator/dashboard/reports`} className='mod-button-link'>
                <button className="mod-button">View Reports</button>
                </Link>
                <button className="mod-button">View Publisher Requests</button>
                <button className="mod-button">Remove Users</button>
            </div>

            <div className="mod-latest-reports">
                <div className="mod-latest-reports-title">
                    <h2>Latest Reports</h2>
                </div>
                <div className="mod-latest-reports-content">
                    <p>To be implemented</p>
                </div>
                
            </div>
            
        </div>
    );
}

export default Dashboard; 