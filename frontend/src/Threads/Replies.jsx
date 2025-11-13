import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Reviews.module.css'

function Replies() {
    const { reviewId } = useParams();
    const [thread, setThread] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    console.log("review id: " + reviewId);
    useEffect(() => {
        axios.get(`http://localhost:8000/app/threads/reviews/replies/${reviewId}`)
        .then(res => {
            setThread(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [reviewId]);

    // useEffect(() =>{
    //     console.log(replies)
    //     if (!loading) {
    //         console.log(replies['replies'].length)
    //     }
    // }, [replies]);

    function displayReplies() { 
        if (thread['replies'].length) {
        return thread['replies'].map((item, idx) => (
            <>
            <div className={styles.postBox} key={idx} onClick={() => navigate(`/replies/${item.id}`)}>
                <h2>{item.title}</h2>
                <h3>{item.firstname} {item.surname}</h3>
                <h3>{item.message}</h3>
                <div className={styles.postStats}>
                    <p>votes</p>
                    <p>comments</p>
                    <p>{new Date(item.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}</p>
                </div>
                {/* upvotes */}
                {/* downvotes */}
                {/* comments */}
            </div>
            </>
        ))} else {
            return (
                <p>Nothing to display</p>
            )
        }};


    return(
        <>
        <div>
            <h1>Hello World</h1>
            <button onClick={() => navigate(-1)}>back</button>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : displayReplies()}
        </div>
        </>
    );

};

export default Replies;