import { useState,useEffect,Fragment } from 'react';
import axios from 'axios';
import styles from './Reviews.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { user_info } from '../endpoints/api';
import comment_img from '../assets/chat.png';
import report_img from '../assets/red-flag.png'; 
import close_modal from '../assets/delete.png';


function Reviews() {
    const { reviewId } = useParams();
    const [parents, setParents] = useState({});
    const [loading, setLoading] = useState(true);
    const [noGame, setNoGame] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [game, setGame] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        // console.log(user)
        axios.get(`http://localhost:8000/app/threads/reviews/${reviewId}/`, {params: user ? {"userEmail": user.email} : {}})
        .then(res => {
            if (!Number.isInteger(res.data)) {
            setParents(res.data.parents)
            setGame(res.data.game)
            setLoading(false)
            } else {
                setNoGame(true);
            }
        })
        .catch(error => console.log(error))
    }, [user]);

    const titleChange = (event) => {
        setNewTitle(event.target.value)
    };

    const messageChange = (event) => {
        setNewMessage(event.target.value)
    }
    
    const createNewPost = () => {
        axios.post("http://localhost:8000/app/threads/reviews/new-post/", {
            gameId: reviewId,
            userEmail: user.email,
            title: newTitle,
            message: newMessage
        },
        {withCredentials: true})
        .then(response => console.log(response))
        setNewTitle("")
        setNewMessage("")
        window.location.reload()
    };

    function updateUserVote(idx, upvote) {
        // if upvote and current is nothing, set vote to true - post votes + 1
        // if downvote and current is nothing, set vote to false - post votes - 1
        // if upvote and current is upvote, set vote to null - post votes - 1
        // if downvote and current is downvote, set vote to null - post votes + 1
        // if downvote and current is upvote, set vote to false - post votes - 2
        // if upvote and current is downvote, set vote to true - post votes + 2

        setParents(current => current.map((parent, i) => {
            if (idx !== i) {
                return parent
            }
            let new_userVote;
            let new_voteValue;
            if (parent.userVote == null) {
                new_userVote = upvote
                new_voteValue = upvote ? 1 : -1 
            } else if (parent.userVote == upvote) {
                new_userVote = null
                new_voteValue = upvote ? -1 : 1
            } else {
                new_userVote = upvote
                new_voteValue = upvote ? 2 : -2
            }
            return {...parent, userVote: new_userVote, votes:parent.votes + new_voteValue}

        }))

        
    }

    // useEffect(() => {
    //     console.log(parents)
    // }, [parents])

    const upVote = (id, idx) => {
        if (user) {
            updateUserVote(idx, true)
            axios.post("http://localhost:8000/app/threads/reviews/votes/", {
                "vote": true,
                "postId": id,
                "userEmail": user.email
            },
            { withCredentials: true })
        };
    }

    const downVote = (id, idx) => {
        if (user) {
            updateUserVote(idx, false)
            axios.post("http://localhost:8000/app/threads/reviews/votes/", {
                "vote": false,
                "postId": id,
                "userEmail": user.email
            },
            { withCredentials: true })
        };
    }

    useEffect(() => {
        const fetch_info = async() => {
            const current_user = await user_info()
            setUser(current_user)
        }
        fetch_info()
    }, [])

    const displayParents = () =>  {
        if (parents.length < 1) {
            // console.log("nothing here!")
            return(
                <h3 className={styles.emptyReplies}>Seems like it's pretty empty in here... Why not be the first to Comment!</h3>
            )
        }
        // setupVotes()
        // need to add items to the useState so that they can be recorded and requests are only made when there is actually a change
        return parents.map((item, idx) => (
        <Fragment key={idx}>
        <div className={styles.vpBox}>
            <div className={styles.votesBox}>
                <button className={styles.voteBtn} onClick={(e) => upVote(item.id, idx)} style={item.userVote != null ? item.userVote ? {color:"#00a6ff"} : null : null}>&uarr;</button>
                <h3 className={styles.voteCount}>{item.votes}</h3>
                <button className={styles.voteBtn} onClick={(e) => downVote(item.id, idx)} style={item.userVote != null ? item.userVote ? null : {color: "red"} : null}>&darr;</button>
            </div>
            <div className={styles.postBox} onClick={() => navigate(`/replies/${item.id}`)}>
                <h2 className={styles.postTitle}>{item.title}</h2>
                {/* profile picture */}
                <div className={styles.postOwner}>
                    <h3 className={styles.postName}>{item.firstname} {item.surname}</h3>
                    <h5 className={styles.postUsername}>@{item.username}</h5>
                </div>
                <h3 className={styles.postMessage}>{item.message}</h3>
                <div className={styles.postStats}>
                    {/* <p>votes</p> */}
                    <p className={styles.postDate}>{new Date(item.date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}</p>
                    <img className={styles.commentImg} src={comment_img}></img>
                    <p>{item.comments}</p>
                    <img className={styles.reportImg} src={report_img}></img>
                </div>
            </div>
        </div>
        </Fragment>
    ))};

    return(
        <>
            <button className={styles.backBtn} onClick={() => navigate(`/gameprofile/${reviewId}`)}>Back</button>
            <h1 className={styles.gameName}>{game}</h1>
            {user ? <button className={styles.newPost} onClick={() => setModal(true)}>&#10010;</button> : null}
            {loading ? noGame ? (<h2 className={styles.loadingIcon}>Unfortunately, we don't have that here :/</h2>): (<h2 className={styles.loadingIcon}>Loading...</h2>) : null}
            
            {loading == false ? displayParents() : null}
            <div id='modal-overlay' className={modal ? styles.modalBox : styles.modalHidden} onClick={() => setModal(false)}>
                {/* need to get user details from JWT token? */}
                <div className={styles.modalActual} onClick={e => e.stopPropagation()}>
                    <img className={styles.clostModalBtn} src={close_modal} onClick={() => setModal(false)}/>
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