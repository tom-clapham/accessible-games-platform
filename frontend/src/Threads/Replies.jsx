import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Reviews.module.css'

function Replies() {
    const { reviewId } = useParams();
    const [thread, setThread] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/app/threads/reviews/replies/${reviewId}`)
        .then(res => {
            setThread(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [reviewId]);

    const displayParent = () => {
        return thread['parent'].map((item, idx) => (
            <>
            <div className={styles.parentBox} key={idx}>
                <h2>{item.title}</h2>
            {/* profile picture */}
                <h3>{item.firstname} {item.surname}</h3>
                <h5>{item.username}</h5>
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
        ))
    }

    function displayReplies() { 
        if (thread['replies'].length) {
        return thread['replies'].map((item, idx) => (
            <>
            <div className={styles.replyBox} key={idx} onClick={() => navigate(`/replies/${item.id}`)}>
                <h3>{item.firstname} {item.surname}</h3>
            {/* profile picture */}
                <h5>{item.username}</h5>
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

    const replyChange = (event) => {
        setReply(event.target.value)
    };

    const submitReply = () => {
        axios.post("http://localhost:8000/app/threads/reviews/new-reply/", {
            gameId: reviewId,
            userId: 2, // THIS WILL BE BASED ON THE AUTHENTICATED USER WHEN THAT IS PUSHED
            message: reply,
            parent: thread['parent'][0].id
        })
        // .then(response => console.log(response.data))
        setReply("")
        window.location.reload()
    }

    return(
        <>
        <div>
            <button className={styles.backButton} onClick={() => navigate(-1)}>&larr;</button>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : displayParent()}
            <hr/>
            <div className={styles.createReply}>
                {/* profile picture */}
                &lt;Profile picture&gt;
                <textarea className={styles.createReplyMessage} value={reply} placeholder="Create reply here..." onChange={replyChange}/>
                <button className={styles.createReplyBtn} onClick={submitReply}>Reply</button>
            </div>
            <hr/>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : (<div className={styles.reply}></div>)}
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : displayReplies()}
        </div>
        </>
    );

};

export default Replies;