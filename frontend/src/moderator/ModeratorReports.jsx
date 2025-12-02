import './Moderator.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Divider } from 'primereact/divider';

import {user_info} from '../endpoints/api.js';
import axios from 'axios';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from 'react-router-dom';

function ModeratorReports() {

    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [dialog1Visible, setDialog1Visible] = useState(false);
    const [dialog2Visible, setDialog2Visible] = useState(false);
    const [dialogIgnoreVisible, setDialogIgnoreVisible] = useState(false);
    const [dialogDeleteVisible, setDialogDeleteVisible] = useState(false);
    const [reason, setReason] = useState("");

    // Get all reports
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
        axios.get('http://localhost:8000/app/moderator/reports/', {
            withCredentials: true,
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
            <Button label="View Description" onClick={() => { setReport(rowData); setDialog1Visible(true); }}></Button>
        )
    }

    const viewReviewTemplate = (rowData) => {
        // Button that only shows if a report has been reviewed, and displays a pop up with the report review information
        if (rowData.reviewed_by) {
            return (
                <Button label="View Review" onClick={() => { setReport(rowData); setDialog2Visible(true); }}></Button>
            )
        }
        return (
            <Button label="N/A" disabled></Button>
        )
    }

    const createdAtTemplate = (rowData) => {
        // Format date to be more readable (date then time)
        const date = new Date(rowData.created_at);
        const formattedDate = date.toLocaleDateString(); 
        const formattedTime = date.toLocaleTimeString(); 
        return `${formattedDate} ${formattedTime}`;
    };

    const reviewedAtTemplate = (rowData) => {
        // Format date to be more readable (date then time)
        const date = new Date(rowData.reviewed_at);
        const formattedDate = date.toLocaleDateString(); 
        const formattedTime = date.toLocaleTimeString(); 
        return `${formattedDate} ${formattedTime}`;
    };

    const statusTemplate = (rowData) => {
        // Return differing styles based on review status instead of just plain text
        if (rowData.reviewed_at) {
            return <span className="reviewed">Reviewed</span>;
        }
        return <span className="pending">Pending</span>;
    }

    const contentTemplate = (rowData) => {
        // Button to send moderator to the actual content reported
        if (rowData.gameId) {
            return (
                <div>
                <Link to={`/gameprofile/${rowData.gameId}`}>
                    <Button severity='help' label="View Game"></Button>
                </Link>
                </div>
            );
        }
        else if (rowData.postId) {
            return (
                <Link to={`/replies/${rowData.postId}`}>
                    <Button severity='help' label="View Post"></Button>
                </Link>
            );
        }
    }

    const openIgnoreDialog = (rowData) => {
        setReport(rowData);
        setDialogIgnoreVisible(true);
    }

    const openDeleteDialog = (rowData) => {
        setReport(rowData);
        setDialogDeleteVisible(true);
    }

    const moderatorActionsTemplate = (rowData) => {
        // Buttons for moderator actions on the report
            if (rowData.reviewed_at) {
                return <Button disabled label="Reviewed" severity='success'></Button>;
            }
            return (
                <ButtonGroup>
                    <Button label="Ignore" severity='secondary' onClick={() => { setReport(rowData); openIgnoreDialog(rowData); }}></Button>
                    <Button label="Delete" severity='danger' onClick={() => { setReport(rowData); openDeleteDialog(rowData); }}></Button>
                </ButtonGroup>
            )
    }


    const refreshReports = () => {
        axios.get('http://localhost:8000/app/moderator/reports/', {
            withCredentials: true,
        })
        .then(response => {
            setReports(response.data);
        });
    }

    const handleIgnoreSubmit = (e) => {
        e.preventDefault();
        // Handle ignore form submittions

        axios.post(`http://localhost:8000/app/moderator/reports/review/${report.id}/`, {
            review_action: 'IGNORE',
            review_reason: reason,
        }, {
            withCredentials: true,
        })
        .then(response => {
            setDialogIgnoreVisible(false);
            // Refresh reports
            refreshReports();
            console.log("Report ignored.");
        })
        .catch(error => {
            console.error("Error reviewing report:", error);
        })
        
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        // Handle delete form submissions

        axios.post(`http://localhost:8000/app/moderator/reports/review/${report.id}/`, {
            review_action: 'DELETE',
            review_reason: reason,
        }, {
            withCredentials: true,
        })
        .then(response => {
            setDialogDeleteVisible(false);
            // Refresh reports
            refreshReports();
            console.log("Report deleted successfully.");
        })
        .catch(error => {
            console.error("Error reviewing report:", error);
        })
        
    }


    return (
        <div className="mod-container">
            <div className="mod-title">
                <h1 className="mod-reports-title">User Reports</h1>
                <Divider></Divider>
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
                    <Column header="Moderator Actions" body={moderatorActionsTemplate}></Column>
                    <Column header="Moderator Review" body={viewReviewTemplate}></Column>
                </DataTable>

                <Divider></Divider>

                <Button className="mod-back-button" severity='secondary'>
                    <Link className="mod-back-button-link" to="/moderator/dashboard">Back to Dashboard</Link>
                </Button>

                {/* Dialog used from:https://primereact.org/dialog/ */}

                {/* Dialog for report description */}
                <Dialog header="Report Description" visible={dialog1Visible} onHide={() => setDialog1Visible(false)}>
                    {report && <p>{report.description}</p>}
                </Dialog>

                {/* Dialog for viewing review information */}
                <Dialog header="Review Information" visible={dialog2Visible} onHide={() => setDialog2Visible(false)}>
                    {report &&
                    <div>
                    <p>Reviewed by: {report.reviewed_by}</p>
                    <p>Reviewed at: {report.reviewed_at}</p>
                    <p>Review Notes: {report.review_reason}</p>
                    </div>
                    }
                </Dialog>

                {/* Dialog for ignoring report */}
                <Dialog className="popup-dialog" header="Ignore Report" visible={dialogIgnoreVisible} onHide={() => setDialogIgnoreVisible(false)}>
                    {report &&
                    <div>
                        <form onSubmit={handleIgnoreSubmit}>
                            <InputTextarea 
                            className='text-field' 
                            value={reason} onChange={(e) => setReason(e.target.value)} 
                            placeholder='Enter any report notes'
                            />
                            <Button label="Submit" severity='success' type='submit'/>
                            
                            </form>
                            <Button label="Cancel" severity='danger' onClick={() => setDialogIgnoreVisible(false)}/>
                    </div>}
                </Dialog>

                {/* Dialog for deleting report */}
                <Dialog header="Delete Content" visible={dialogDeleteVisible} onHide={() => setDialogDeleteVisible(false)}>
                    {report &&
                    <div>
                        <form onSubmit={handleDeleteSubmit}>
                            <InputTextarea 
                            className='text-field' 
                            value={reason} onChange={(e) => setReason(e.target.value)} 
                            placeholder='Enter any report notes'
                            />
                            <Button label="Delete Content" severity='danger' type='submit'/>
                            {report.gameId && (
                            <h5>Warning: Deleting a "Game" will also remove all associated posts and reports.</h5>
                            )}
                            </form>
                            <Button label="Cancel" severity='secondary' onClick={() => setDialogDeleteVisible(false)}/>
                    </div>}
                </Dialog>
            
        </div>
        
        </div>
    );
}

export default ModeratorReports;