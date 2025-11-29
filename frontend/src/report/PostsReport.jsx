import { useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

import ReportForm from './ReportForm.jsx';

import {OpenLogin} from '../Login/Login.js';

import axios from 'axios';




function PostsReport() {
    const{postId} = useParams();
    const[post, setPost] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/app/reports/report/post/${postId}/`, {
            withCredentials: true,
        })
        .then(response => {
            setPost(response.data);
            setLoading(false);
        })
        .catch(error => {
            // Check for validation in the backend
            if(error.response?.status == 401){
                OpenLogin();
                navigate(`/reviews/${postId}`); 
                return;
            }
            console.error("Error from get: ", error);
            setLoading(false);
            setError(error);
        });
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading report data.</p>;
    if (!post) return <p>No report data found.</p>;



    return (
        <div className="report-form-container">
            <div className="report-header">
                {/* Back button that takes you back to the reviews of the game you were previously on */}
                {/* Fetched gameId from serializer data */}
                <Link to={`/reviews/${post.gameId}`}>
                    <button className="back-button">Back</button>
                </Link>
                <h1 className="report-title">Report For Post: {post.title}</h1>
            </div>
            <ReportForm postId={post.id}/>
        </div>


        
    )
}

export default PostsReport;