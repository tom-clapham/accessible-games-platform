import { useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import ReportForm from './ReportForm.jsx';

import {OpenLogin} from '../Login/Login.js';

import axios from 'axios';




function Report() {
    const{gameId} = useParams();
    const[game, setGame] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/app/reports/report/game/${gameId}/`, {
            withCredentials: true,
        })
        .then(response => {
            setGame(response.data);
            setLoading(false);
        })
        .catch(error => {
            // Check for validation in the backend
            if(error.response?.status == 401){
                OpenLogin();
                navigate(`/gameprofile/${gameId}`); 
                return;
            }
            console.error("Error from get: ", error);
            setLoading(false);
            setError(error);
        });
    }, [gameId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading report data.</p>;
    if (!game) return <p>No report data found.</p>;



    return (
        <div className="report-form-container">
        <h1 className="report-title">Report for {game.name}</h1>
        <ReportForm gameId={game.id}/>
        </div>
    )
}

export default Report;