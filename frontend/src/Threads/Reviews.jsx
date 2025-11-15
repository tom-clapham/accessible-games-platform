import { useState,useEffect } from 'react'
import axios from 'axios'
import styles from './Reviews.module.css'
import { useNavigate, useParams } from 'react-router-dom'

function Reviews() {
    const { reviewId } = useParams();
    const [parents, setParents] = useState({});
    const [loading, setLoading] = useState(true);
    const [newTitle, setNewTitle] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/app/threads/reviews/${reviewId}`)
        .then(res => {
            setParents(res.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }, []); // This also needs to be re-run when the user leaves a thread of messages - or just store it? Undecided.

    // useEffect(() => {
    //     console.log(parents)
    // }, [parents]);

    const titleChange = (event) => {
        setNewTitle(event.target.value)
    };

    const messageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const openModal = () => {
        document.getElementById("modal-overlay").style.display="block"
    };
    
    const createNewPost = () => {
        axios.post("http://localhost:8000/app/threads/review/new-post/", {
            gameId: reviewId,
            userId: 1, // THIS WILL BE BASED ON THE AUTHENTICATED USER WHEN THAT IS PUSHED
            title: newTitle,
            message: newMessage
        })
        .then(response => console.log(response))
        setNewTitle("")
        setNewMessage("")
        window.location.reload()
    };

    const displayParents = () => parents['parents'].map((item, idx) => (
        <>
        <div className={styles.postBox} key={idx} onClick={() => navigate(`/replies/${item.id}`)}>
            <h2>{item.title}</h2>
            {/* profile picture */}
            <div className={styles.postOwner}>
                <h3>{item.firstname} {item.surname}</h3>
                <h5>{item.username}</h5>
            </div>
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
    ));

    return(
        <>
            <h1>&lt;Game Name&gt;</h1>
            <button className={styles.newPost} onClick={() => setModal(true)}>&#10010;</button>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : null}
            {loading == false ? displayParents() : null}
            <div id='modal-overlay' className={modal ? styles.modalBox : styles.modalHidden} onClick={() => setModal(false)}>
                {/* need to get user details from JWT token? */}
                <div className={styles.modalActual} onClick={e => e.stopPropagation()}>
                    <div className={styles.postNameBlock}>
                        <h3>Firstname</h3>
                        <br/>
                        <h3>Surname</h3>
                    </div>
                    <h3 className={styles.username}>@username</h3>
                    <div className={styles.titleMessage}>
                        <input className={styles.parentTitle} placeholder='Create title...' value={newTitle} onChange={titleChange}/>
                        <textarea className={styles.parentMessage} value={newMessage} placeholder='Write your message here...' onChange={messageChange}></textarea>
                    </div>
                    <button className={styles.postButton} onClick={() => createNewPost()}>Post</button>
                </div>
            </div>
        </>
    );
};
export default Reviews;