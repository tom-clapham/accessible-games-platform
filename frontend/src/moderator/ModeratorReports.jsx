import './Moderator.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import axios from 'axios';


function ModeratorReports() {

    const [reports, setReports] = useState([]);
    const [report, setReport] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/app/moderator/reports/', {
            // withCredentials: true,
        })
        .then(response => {
            setReports(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error from get:', error);
            setLoading(false);
            setError(error);
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading reports.</p>;




    const gameOrPostTemplate = (rowData) => {
        // Check if the report is for a game or a post
        if (rowData.gameId) {
            return "Game ID: " + rowData.gameId;
        }
        else if (rowData.postId) {
            return "Post ID: " + rowData.postId;
        }
        else {
            return "N/A";
        }
    }

    const descriptionTemplate = (rowData) => {
        // Button to view the full description of the report in a dialog
        return (
            <Button label="View Description" onClick={() => { setReport(rowData); setDialogVisible(true); }}></Button>
        )
    }

    const createdAtTemplate = (rowData) => {
        // Format date to be more readable (date then time)
        const date = new Date(rowData.created_at);
        const formattedDate = date.toLocaleDateString(); 
        const formattedTime = date.toLocaleTimeString(); 
        return `${formattedDate} ${formattedTime}`;
    };

    const statusTemplate = (rowData) => {
        // Return differing styles based on review status instead of just plain text
        if (rowData.reviewed) {
            return <span className="reviewed">Reviewed</span>;
        }
        return <span className="pending">Pending</span>;
    }

    const contentTemplate = (rowData) => {
        // Button to send moderator to the actual content reported
        if (rowData.gameId) {
            return (
                <Link to={`/gameprofile/${rowData.gameId}`}>
                    <Button label="View Game"></Button>
                </Link>
            );
        }
        else if (rowData.postId) {
            return (
                <Link to={`/reviews/${rowData.postId}`}>
                    <Button label="View Post"></Button>
                </Link>
            );
        }
    }


    return (
        <div className="mod-container">
            <div className="mod-title">
                <h1>reports</h1>
                {/* DataTable used from: https://primereact.org/datatable/ */}
                <DataTable value={reports} stripedRows paginator rows={10} showGridlines>
                    <Column header="Status" body={statusTemplate}></Column>
                    <Column field="id" header="Report ID"></Column>
                    <Column field="report_type" header="Reason"></Column>
                    <Column header="Content" body={gameOrPostTemplate}></Column>
                    <Column header="Reported At" body={createdAtTemplate}></Column>
                    <Column field="userId" header="User ID"></Column>
                    <Column header="Description" body={descriptionTemplate}></Column>
                    <Column header="View Content" body={contentTemplate}></Column>
                </DataTable>
                {/* Dialog used from:https://primereact.org/dialog/ */}
                <Dialog header="Report Description" visible={dialogVisible} onHide={() => setDialogVisible(false)}>
                    {report && <p>{report.description}</p>}
                </Dialog>
            </div>
        </div>
        
    );
}

export default ModeratorReports;