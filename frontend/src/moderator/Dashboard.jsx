import axios from 'axios';
import { useEffect, useState } from 'react';
import './Moderator.css';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {user_info} from '../endpoints/api.js';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';



function Dashboard() {
    const navigate = useNavigate();
    const [recentReports, setRecentReports] = useState([]);
    

    useEffect(() => {
        user_info()
        .then(user => {
            if(!user.is_moderator){
                navigate('/discover');
                return;
            }
        })
        .catch(error => {
            
            navigate('/discover');
        });



        // Fetch recent reports
        axios.get('http://localhost:8000/app/moderator/reviewed-reports/', { 
            withCredentials: true })
            .then(response => {
                setRecentReports(response.data);
            })
            .catch(error => {
                if(error.response?.status === 401){
                    navigate('/discover');
                    return;
                }
                console.error('Error fetching recent reports:', error);
            });
    }, []);

        const reviewedAtTemplate = (rowData) => {
        // Format date to be more readable (date then time)
        const date = new Date(rowData.reviewed_at);
        const formattedDate = date.toLocaleDateString(); 
        const formattedTime = date.toLocaleTimeString(); 
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className="mod-container">
            <div className="mod-title">
                <h1>Moderator Dashboard</h1>
            </div>

            <div className="mod-welcome-title">
                <h2>Welcome!</h2>
                <Divider />
            </div>

            <div className="mod-side-grid">
                <Link to={`/moderator/dashboard/reports`} className='mod-button-link'>
                <button className="mod-button">View Reports</button>
                </Link>
                <Link to={`/moderator/dashboard/publisher-requests`} className='mod-button-link'>
                <button className="mod-button">View Publisher Requests</button>
                </Link>
            </div>
            <div className="mod-latest-reports">
                <div className="mod-latest-reports-title">
                    <h2>Recent Moderator Activity</h2>
                </div>
                <div className="mod-latest-reports-content">
                    <DataTable value={recentReports} stripedRows>
                        <Column field="id" header="ID"></Column>
                        <Column header="Reviewed At" body={reviewedAtTemplate}></Column>
                        <Column field="reviewed_by" header="Reviewed By ID"></Column>
                        <Column field="review_reason" header="Review Reason"></Column>
                        <Column field="review_action" header="Review Action"></Column>


                    </DataTable>
                </div>
                
            </div>
            
        </div>
    );
}

export default Dashboard; 