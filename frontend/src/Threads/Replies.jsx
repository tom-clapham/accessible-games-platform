import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Reviews.module.css'
import { user_info } from '../endpoints/api';
import comment_img from '../assets/chat.png';
import report_img from '../assets/red-flag.png';
import profile_img from '../assets/user.png';

import { Link } from 'react-router-dom';

function Replies() {
    const { reviewId } = useParams();
    const [thread, setThread] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");
    const [user, setUser] = useState(false)
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/app/threads/reviews/replies/${reviewId}/`, {params: user ? {"userEmail": user.email} : {}})
        .then(res => {
            setThread(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [reviewId, user]);

    function updateUserVote(idx, upvote, parent) {
        // if upvote and current is nothing, set vote to true - post votes + 1
        // if downvote and current is nothing, set vote to false - post votes - 1
        // if upvote and current is upvote, set vote to null - post votes - 1
        // if downvote and current is downvote, set vote to null - post votes + 1
        // if downvote and current is upvote, set vote to false - post votes - 2
        // if upvote and current is downvote, set vote to true - post votes + 2
        // console.log(parent)
        if (parent) {
            setThread(current => ({...current,
                parent: current.parent.map((parent, i) => {
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
            })}))
        } else {
            setThread(current => ({...current,
                replies: current.replies.map((parent, i) => {
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
            })}))
        }

        
    }

    // useEffect(() => {
    //     console.log("parents", thread.parent)
    //     console.log("threads", thread.replies)
    // }, [thread])

    const upVote = (id, idx, parents=false) => {
        // console.log(id)
        if (user) {
            updateUserVote(idx, true, parents)
            axios.post("http://localhost:8000/app/threads/reviews/votes/", {
                "vote": true,
                "postId": id,
                "userEmail": user.email
            },
            { withCredentials: true })
        };
    }

    const downVote = (id, idx, parents=false) => {
        if (user) {
            updateUserVote(idx, false, parents)
            axios.post("http://localhost:8000/app/threads/reviews/votes/", {
                "vote": false,
                "postId": id,
                "userEmail": user.email
            },
            { withCredentials: true })
        };
    }

    const displayParent = () => {
        return thread['parent'].map((item, idx) => (
            <Fragment key={idx}>
                <div className={styles.parentBox}>
                    <h2 className={styles.rpTitle}>{item.title}</h2>
                {/* profile picture */}
                    <h3 className={styles.rpName}>{item.firstname} {item.surname}</h3>
                    <h5 className={styles.rpUsername}>@{item.username}</h5>
                    <h3 className={styles.rpMessage}>{item.message}</h3>
                    <div className={styles.postStats}>
                            {/* <p>votes</p> */}
                            <p className={styles.postDate}>{new Date(item.date).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                            })}</p>
                            <button data-testid='upvote-btn' className={styles.rpUpVoteBtn} onClick={(e) => upVote(item.id, idx, true)} style={item.userVote != null ? item.userVote ? {color:"#00a6ff"} : null : null}>&uarr;</button>
                            <h3 data-testid='vote-count' className={styles.voteCount}>{item.votes}</h3>
                            <button data-testid='downvote-btn' className={styles.rpDownVoteBtn} onClick={(e) => downVote(item.id, idx, true)} style={item.userVote != null ? item.userVote ? null : {color: "red"} : null}>&darr;</button>
                            <img className={styles.rpCommentImg} src={comment_img}></img>
                            <p>{item.comments}</p>
                            <Link to={`/report/post/${item.id}`} onClick={(e) => { e.stopPropagation(); }}>
                                <button className={styles.reportFlag} >
                                    <img className={styles.reportImg} src={report_img} alt="Report Post"></img>
                                </button>
                            </Link>
                        </div>
            </div>
            </Fragment>
        ))
    }

    function displayReplies() { 
        if (thread['replies'].length) {
        return thread['replies'].map((item, idx) => (
            <Fragment key={idx}>
                <div className={styles.vpBox}>
                    <div className={styles.votesBox}>
                        <button className={styles.upVoteBtn} onClick={(e) => upVote(item.id, idx)} style={item.userVote != null ? item.userVote ? {color:"#00a6ff"} : null : null}>&uarr;</button>
                        <h3 className={styles.voteCount}>{item.votes}</h3>
                        <button className={styles.downVoteBtn} onClick={(e) => downVote(item.id, idx)} style={item.userVote != null ? item.userVote ? null : {color: "red"} : null}>&darr;</button>
                    </div>
                    <div className={styles.postBox} onClick={() => navigate(`/replies/${item.id}`)}>
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
                            <Link to={`/report/post/${item.id}`} onClick={(e) => { e.stopPropagation(); }}>
                                <button className={styles.reportFlag} >
                                    <img className={styles.reportImg} src={report_img} alt="Report Post"></img>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        ))} else {
            return (
                <p className={styles.emptyReplies}>Nothing to display... yet...</p>
            )
        }};

    useEffect(() => {
        const fetch_info = async() => {
            const current_user = await user_info()
            setUser(current_user)
            // console.log("I am the user: " + user)
        }
        fetch_info()
    }, [])

    // useEffect(() => {
    //     console.log(user)
    // }, [user])
    

    const replyChange = (event) => {
        setReply(event.target.value)
    };

    const submitReply = () => {
        axios.post("http://localhost:8000/app/threads/reviews/new-reply/", {
            gameId: reviewId,
            userEmail: user.email, 
            message: reply,
            parent: thread['parent'][0].id
        },
        {withCredentials:true})
        setReply("")
        window.location.reload()
    }

    return(
        <>
        <div>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : displayParent()}
            {user ? (
            <>
            <hr className={styles.replyHr}/>
            <div className={styles.createReply}>
                    <img className={styles.profileImg} src={profile_img}/>
                    <textarea className={styles.createReplyMessage} value={reply} placeholder="Create reply here..." onChange={replyChange}/>
                    <button data-testid='reply-btn' className={styles.createReplyBtn} onClick={submitReply}>Reply</button>
            </div>
            <hr className={styles.replyHr}/>
            </>) : <hr className={styles.replyHr}/>}
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : (<div className={styles.reply}></div>)}
            {loading ? (<h2 className={styles.loadingIcon}>Loading...</h2>) : displayReplies()}
        </div>
        </>
    );

};

export default Replies;