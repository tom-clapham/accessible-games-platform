import { useState,useEffect } from 'react'
import axios from 'axios'
import styles from './Reviews.module.css'

function Reviews(reviewId) {
    const [parents, setParents] = useState({});
    const [replies, setReplies] = useState({});
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(0) // 0 Means that we are looking at the main posts, 1 means that we are looking at a thread

    useEffect(() => {
        axios.get(`http://localhost:8000/app/threads/reviews/${reviewId.id}`)
        .then(res => {
            setParents(res.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, []); // This also needs to be re-run when the user leaves a thread of messages - or just store it? Undecided.

    // useEffect(() => {
    //     console.log(parents)
    // }, [parents]);

    const displayParents = () => parents['parents'].map((item, idx) => (
        <>
        <div key={idx}>
            <h2>{item.title}</h2>
            <h3>{item.firstname} {item.surname}</h3>
            <h3>{item.message}</h3>
            <h3>{new Date(item.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })}</h3>
            {/* upvotes */}
            {/* downvotes */}
            {/* comments */}
        </div>
        </>
    ));
    
    return(
        <>
            <h1>&lt;Game Name&gt;</h1>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : null}
            {loading == false ? displayParents() : null}
        </>
    );
}
export default Reviews;