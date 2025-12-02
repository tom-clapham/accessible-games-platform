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


function ModeratorPublishers() {

    const navigate = useNavigate();
    const [publishers, setPublishers] = useState([]);
    const [publisher, setPublisher] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState("");

    // Get all publisher requests
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
        axios.get('http://localhost:8000/app/moderator/publisher-requests/', 
            { withCredentials: true })
            .then(response => {
                setPublishers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching publisher requests:', error);
                setLoading(false);
                setError(error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading publisher requests.</p>;

    const logoTemplate = (rowData) => {
        return (
        
        <div className='pc-image-box'>
        
        
        <img src={`http://localhost:8000${rowData.logo}`} alt="Publisher Logo"/>;
        </div>
        );
    }

    const refreshRequests = () => {
        axios.get('http://localhost:8000/app/moderator/publisher-requests/', 
            { withCredentials: true })
            .then(response => {
                setPublishers(response.data);
            })
            .catch(error => {
                console.error('Error fetching publisher requests:', error);
            });
    };

    const handleAccept = (rowData) => {
        axios.post(`http://localhost:8000/app/moderator/publisher-requests/review/${rowData.id}/`,
            { pending: false },
            { withCredentials: true }
        )
        .then(response => {
            refreshRequests();
            setSubmitStatus(true);
            setSubmitMessage("Publisher request " + rowData.name + " accepted successfully.");
        })
        .catch(error => {
            console.error('Error accepting publisher request:', error);
        });
    }

    const handleDelete = (rowData) => {
        axios.post(`http://localhost:8000/app/moderator/publisher-requests/review/${rowData.id}/`,
            { pending: true },
            { withCredentials: true }
        )
        .then(response => {
            refreshRequests();
            setSubmitStatus(true);
            setSubmitMessage("Publisher request " + rowData.name + " declined successfully.");
        })
        .catch(error => {
            console.error('Error declining publisher request:', error);
        });
    }

    const moderatorActionsTemplate = (rowData) => {
        // Buttons for moderator actions on the report
            if (rowData.pending === false) {
                return <Button disabled label="Accepted" severity='success'></Button>;
            }
            return (
                <ButtonGroup>
                    <Button label="Accept" severity='success' onClick={() => { setPublisher(rowData); handleAccept(rowData); }}></Button>
                    <Button label="Decline" severity='danger' onClick={() => { setPublisher(rowData); handleDelete(rowData); }}></Button>
                </ButtonGroup>
            )
    }   


    return (
    <div className="mod-container">
            <div className="mod-title">
                <h1 className="mod-reports-title">Publisher Requests</h1>
                <Divider></Divider>
                {/* DataTable used from: https://primereact.org/datatable/ */}
                <DataTable value={publishers} stripedRows paginator rows={5} showGridlines>
                    <Column field="id" header="ID"></Column>
                    <Column header="Logo" body={logoTemplate}></Column>
                    <Column field="name" header="Publisher Name"></Column>
                    <Column field="url" header="Website URL"></Column>
                    <Column field="created_at" header="Requested At"></Column>
                    <Column header="Moderator Actions" body={moderatorActionsTemplate}></Column>

                
                </DataTable>

                <Divider></Divider>

                <Button className="mod-back-button" severity='secondary'>
                    <Link className="mod-back-button-link" to="/moderator/dashboard">Back to Dashboard</Link>
                </Button>
                
            </div>
            {submitStatus === true && (
                    <p className="submit-message-success">{submitMessage}</p>
                )}
            {submitStatus === false && (
                    <p className="submit-message-error">{submitMessage}</p>
                )}
        </div>
    );
}

export default ModeratorPublishers;