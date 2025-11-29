import {useState, useEffect, Fragment, route} from 'react'
import { updateDetails, updatePreferences, updatePersonal, user_info, deleteAccount, getAccessibility, getGenres, changePassword, logout, getUserPosts, getAllFavouriteGames } from '../endpoints/api'
import styles from './Account.module.css'
import { useLocation } from 'react-router-dom'
import { CiUser  } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import GameCard from '../browse/GameCard';
import comment_img from '../assets/chat.png';
import report_img from '../assets/red-flag.png'; 

const Account = () => {

    const [info, setInfo] = useState({accessibility_tags: [], genre_tags: []})
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("")
    const { message } = location.state || {}
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showAccessibility , setShowAccessibility] = useState(false)
    const [showGenre , setShowGenre] = useState(false)
    const [allGenres , setAllGenres] = useState([])
    const [allAccessibility , setAllAccessibility] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [userAccessibility, setUserAccessibility] = useState([])
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [games, setGames] = useState([])

    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [sure, setSure] = useState(false);
    const [match, setMatch] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [oldPasswordMatch, setOldPasswordMatch] = useState(false)
    const [posts, setPosts] = useState(false)

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleEdit = (id) => {
        const input = document.getElementById(id);
        input.disabled = false;
        input.focus();

        input.addEventListener("blur", function onBlur() {
            input.disabled = true;
            input.removeEventListener("blur", onBlur);
        });
    };

    const handleEditDob = (day, month, year) => {

        const ids = [day, month, year];
        ids.forEach(id => {
        const input = document.getElementById(id);
        input.disabled = false;
        input.addEventListener("blur", function onBlur() {
            input.disabled = true;
            input.removeEventListener("blur", onBlur);
        });
        });
    };

    const handlePersonalSave = async (first, last, day, month, year) => {
        const d = new Date(year, month - 1 , day);
        const isoString = d.toISOString();        
        const dateOnly = isoString.split('T')[0];
        const success = await updatePersonal(first, last, dateOnly);
        if(success){
            setErrorDate(false)
            setUpdateSuccess(true)
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            setErrorDate(true)
            setUpdateSuccess(false)
        }
    } 

    const handleDetailsSave = async (username, email) => {
        const success = await updateDetails(username, email);
        if(success){
            setUpdateSuccess(true)
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else if(success === "email"){
            setErrorEmail(true)
            setUpdateSuccess(false)
        } else if(success === "username"){
            setErrorUsername(true)
            setUpdateSuccess(false)
        }
    }

    const handlePreferencesSave = async (genres, accessibilities) => {
        console.log(genres)
        console.log(accessibilities)
        const success = await updatePreferences(genres, accessibilities);
        if(success){
            setUpdateSuccess(true)
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }

    const handleDeletePopup = () => {
        setSure(true);
    };

    const handleDeleteAccount = () => {
        deleteAccount();
        const timeout = setTimeout(() => {
                window.location.reload();
        }, 1000);

    }
    
    useEffect(() => {
        const fetchInfo = async () => {
        const info = await user_info();
            setInfo(info);
            setFirst(info.first_name)
            setLast(info.last_name);
            const [y, m, d] = info.date_of_birth.split("-");
            setDay(d);
            setMonth(m);
            setYear(y);
            setUsername(info.username);
            setEmail(info.email);
            setUserGenres(info.genre_tags);
            setUserAccessibility(info.accessibility_tags);
        }

        if(message){
            fetchInfo();
        }
    }, []);

    useEffect(() => {
        const message = location.state?.message;
        if(message === 'favourites'){
            setActiveSection("favourite")
        } else {
            setActiveSection("account")
        }
    }, [location])

    useEffect(() => {
        const fetchUserPosts = async () => {
        const success = await getUserPosts();
        setPosts(success)
    }
    fetchUserPosts();

    },[])

    useEffect(() => {
        const fetchAccessibility = async () => {
        const success = await getAccessibility();
        const namesArray = success.map(item => item.name);
        setAllAccessibility(namesArray)
    }
    fetchAccessibility();

    }, [])
    
    useEffect(() => {
        const fetchGenres = async () => {
        const success = await getGenres();
        const namesArray = success.map(item => item.name);
        setAllGenres(namesArray)
    }
    fetchGenres();

    }, [])

    useEffect(() => {
        const fetchGames = async () => {
        const success = await getAllFavouriteGames();
        setGames(success)
    }
    fetchGames();
    }, [])

    const displayParents = () =>  {
        if (posts.length < 1) {
            return(
                <h3 className={styles.emptyReplies}>Seems like it's pretty empty in here... Why not be the first to Comment!</h3>
            )
        }
        return posts.map((item, idx) => (
        <Fragment key={idx}>
        <div className={styles.vpBox}>
            <div className={styles.postBox} onClick={() => navigate(`/replies/${item.id}`)}>
                <h2 className={styles.postTitle}>{item.title}</h2>
                <div className={styles.postOwner}>
                    <h3 className={styles.postName}>{item.firstname} {item.surname}</h3>
                    <h5 className={styles.postUsername}>@{item.username}</h5>
                </div>
                <h3 className={styles.postMessage}>{item.message}</h3>
                <div className={styles.postStats}>
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

    function handleShowAccessibility(){
        if(showAccessibility){
            setShowAccessibility(false)
        } else {
            setShowAccessibility(true)
            console.log(allAccessibility)
        }
    }

    function handleShowGenres(){
        if(showGenre){
            setShowGenre(false)
        } else {
            setShowGenre(true)
            console.log(allGenres)
        }
    }

    const handleDeleteAccessibility = (id) => {
        const updatedTags = userAccessibility.filter(tag => tag !== id);
        setUserAccessibility(updatedTags);
        allAccessibility.push(id)
    }
    
    const handleDeleteGenres = (id) => {
        const updatedTags = userGenres.filter(tag => tag !== id);
        setUserGenres(updatedTags);
        allGenres.push(id)
    }

    const handleAddAccessibility = (item) => {
        const updatedTags = allAccessibility.filter(tag => tag !== item);
        setAllAccessibility(updatedTags);
        userAccessibility.push(item)
    }

    const handleAddGenres = (item) => {
        const updatedTags = allGenres.filter(tag => tag !== item);
        setAllGenres(updatedTags);
        userGenres.push(item)
    } 
    
    const handleChangePassword = async (oldPass, newPass, confirmPass) => {
        const success = await changePassword(oldPass, newPass, confirmPass);
        if(success == 'invalidNewPassword'){
            setInvalid(true)
            setMatch(false)
            setOldPasswordMatch(false)
        } else if(success == 'passwordMatch'){
            setInvalid(false)
            setMatch(true)
            setOldPasswordMatch(false)
        } else if (success == 'oldPasswordWrong'){
            setInvalid(false)
            setMatch(false)
            setOldPasswordMatch(true)
        } else {
            setUpdateSuccess(true)
            setInvalid(false)
            setMatch(false)
            setOldPasswordMatch(false)
            const timeout = setTimeout(async () => {
                const success = await logout();
                if(success){
                    window.location.reload();
                }
            }, 3000);
        }
    }

    return (
        <div className={styles.settings_container}>
            <h1>My Settings</h1>
            {updateSuccess && (<div className={styles.success}>Your details have been updated successfully. The page will automatically reload in <b>3 seconds</b></div>)}
            <ul className={styles.account_list}>
                <li className={`${styles.list_account} ${activeSection === "account" ? styles.navActive : ""}`} onClick={() => handleSectionChange("account")}><CiUser className={styles.icon2}/>My Account</li>
                <li className={`${styles.list_favourited} ${activeSection === "favourite" ? styles.navActive : ""}`} onClick={() => handleSectionChange("favourite")}><FaRegHeart className={styles.icon2}/>My Games</li>
                <li className={`${styles.list_community} ${activeSection === "community" ? styles.navActive : ""}`} onClick={() => handleSectionChange("community")}><FaRegCommentDots className={styles.icon2}/>My Reviews</li>
            </ul>
            {activeSection == "account" &&(
            <div className={styles.account_content}>
                <div className={styles.section}>
                    <hr className={styles.topLine}/>
                    <h2 className={styles.title}>Personal Details</h2>
                    <h3>Manage your name and contact info. These personal details are private and will not be displayed to other users.</h3>
                    <div className={styles.nameContainer}>
                        <div className={styles.firstContainer}>
                            <label className={styles.label}>First Name</label>
                            <input id="first" className={styles.input} required disabled value={first} maxLength='100' type='text' placeholder={info.first_name} onChange={(e) => setFirst(e.target.value)}></input>
                        </div>
                        <button className={styles.edit} onClick={() => handleEdit("first")}><MdOutlineEdit className={styles.edit_icon}/></button>
                        <div className={styles.lastContainer}>
                            <label className={styles.label}>Last Name</label>
                            <input id="last" className={styles.input} required disabled value={last} maxLength='100' type='text' placeholder={info.last_name} onChange={(e) => setLast(e.target.value)}></input>
                        </div>
                        <button className={styles.edit} onClick={() => handleEdit("last")}><MdOutlineEdit className={styles.edit_icon}/></button>
                    </div>
                    <div className={styles.elements}>
                        <label className={styles.label}>Date of birth</label>
                        <div className={styles.dropdown}>
                            <select id="day" className={styles.input} value={day} disabled required onChange={(e) => setDay(e.target.value)}>
                                <option value="">Day</option>
                                {[...Array(31)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>))}
                            </select>
                            <select id="month" className={styles.input} value={month} required disabled onChange={(e) => setMonth(e.target.value)}>
                                <option value="" disabled>Month</option>
                                <option value='01'>Jan</option>
                                <option value='02'>Feb</option>
                                <option value='03'>Mar</option>
                                <option value='04'>Apr</option>
                                <option value='05'>May</option>
                                <option value='06'>Jun</option>
                                <option value='07'>Jul</option>
                                <option value='08'>Aug</option>
                                <option value='09'>Sep</option>
                                <option value='10'>Oct</option>
                                <option value='11'>Nov</option>
                                <option value='12'>Dec</option>
                            </select>
                            <input id="year" className={styles.input} type='text' disabled placeholder={year} maxLength='4' onChange={(e) => setYear(e.target.value)}></input>
                            <button className={styles.edit_dob} onClick={() => handleEditDob("day", "month", "year")}><MdOutlineEdit className={styles.edit_icon}/></button>
                        </div>
                    </div>
                    {errorDate &&(<div className={styles.error}><IoIosWarning className={styles.warning} />Please enter your real birthday.</div>)}
                    <button className={styles.save} onClick={() => handlePersonalSave(first, last, Number(day), Number(month), Number(year))}>Save Changes</button>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.title}>Account Information</h2>
                    <h3>Manage your username and email. Your username is unique to you, so get creative!</h3>
                    <form className={styles.accountContainer}>
                        <div className={styles.usernameContainer}>
                            <label className={styles.label}>Username</label>
                            <input id="username" className={styles.input} disabled maxLength='100' type='text' placeholder={info.username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <button className={styles.edit} type='button' onClick={() => handleEdit("username")}><MdOutlineEdit className={styles.edit_icon}/></button>
                        <div className={styles.emailContainer}>
                            <label className={styles.label}>Email</label>
                            <input id="email" className={styles.input} disabled maxLength='100' type='email' placeholder={info.email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <button className={styles.edit} type='button' onClick={() => handleEdit("email")}><MdOutlineEdit className={styles.edit_icon}/></button>
                    </form>
                    {errorEmail &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>This email has already been taken.</div>)}
                    {invalidEmail &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>Please enter a real email address.</div>)}
                    {errorUsername &&(<div className={styles.error}><IoIosWarning className={styles.warning}/>This username has already been taken.</div>)}
                    <button className={styles.save} onClick={() => handleDetailsSave(username, email)}>Save Changes</button>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.title}>Password & Security</h2>
                    <h3>Change your password here. We recommend doing this frequently, it helps keep your account more secure.</h3>
                    <div className={styles.changePassword}>
                        <label className={styles.label}>Old password</label>
                        <input className={styles.input} type='password' maxLength='100' placeholder='Enter your old password' onChange={(e) => setOldPassword(e.target.value)}></input>
                        <label className={styles.label}>New password</label>
                        <input className={styles.input} type='password' maxLength='100' placeholder='Enter your new password' onChange={(e) => setNewPassword(e.target.value)}></input>
                        <label className={styles.label}>Confirm new password </label>
                        <input className={styles.input} type='password' maxLength='100' placeholder='Re-enter you new password' onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
                        {match &&(<div className={styles.errorPassword}><IoIosWarning className={styles.warningPassword}/>The new passwords don't match.</div>)}
                        {invalid &&(<div className={styles.errorPassword}><IoIosWarning className={styles.warningPassword}/>
                            <div>
                                Your password must contain:
                                <ul>
                                    <li>A minimum of 8 characters</li>
                                    <li>At least 2 numbers</li>
                                    <li>One upper case character</li>
                                </ul>
                            </div>
                        </div>)}
                        {oldPasswordMatch &&(<div className={styles.errorPassword}><IoIosWarning className={styles.warningPassword}/>Your current password doesn't match.</div>)}
                        <button className={styles.regular_button} onClick={() => handleChangePassword(oldPassword, newPassword, confirmNewPassword)}>Change Password</button>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.title}>Accessibility & Genres</h2>
                    <h3>Manage your accessibility needs and favourite game genres here, this helps us tailor your experience.</h3>
                    <div className={styles.accessibility_section}>
                        <span>Accessibility Preferences</span>
                        <ul className={styles.accessibility_list}>
                            {userAccessibility?.map((tag, i) => (
                            <li id={tag} key={i + 1}>
                                {tag}<TiDelete className={styles.cross} onClick={() => handleDeleteAccessibility(tag)}/>
                            </li>))}
                        </ul>
                        <div className={styles.searchContainer}>
                            <button className={styles.edit} onClick={handleShowAccessibility}>{showAccessibility ? 'Hide available genre tags' : 'Show available genre tags'}</button>
                            {showAccessibility ?(<ul className={styles.accessibilityList}>
                                {allAccessibility.map(item => (
                                <li key={item.id} className={styles.item}>{item}<button className={styles.add} onClick={() => handleAddAccessibility(item)}>Add</button></li>
                                ))}
                            </ul>) : (<ul></ul>)}
                        </div>
                    </div>
                    <div className={styles.genres_section}>
                        <span>Game Genre Preferences</span>
                        <ul className={styles.genre_list}>
                            {userGenres?.map((tag, i) => (
                            <li id={tag} key={i + 1}>
                                {tag}<TiDelete className={styles.cross} onClick={() => handleDeleteGenres(tag)}/>
                            </li>))}
                        </ul>
                        <div className={styles.searchContainer}>
                            <button className={styles.edit} onClick={handleShowGenres}>{showGenre ? 'Hide available accessibility tags' : 'Show available accessibility tags'}</button>
                            {showGenre ?(<ul className={styles.genreList}>
                                {allGenres.map(item => (
                                <li key={item.id} className={styles.item}>{item}<button className={styles.add} onClick={() => handleAddGenres(item)}>Add</button></li>
                                ))}
                            </ul>) : (<ul></ul>)}
                        </div>
                    </div>
                    <button className={styles.save} onClick={() => handlePreferencesSave(userGenres, userAccessibility)}>Save Changes</button>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.section}>
                    <div>
                        <h2 className={styles.title}>Delete Account</h2>
                        <h3>Permanently delete your account including all personal information, favourite games,
                        accessibility preferences and genre preferences. You will not be able to recover it thereafter.</h3>
                        <button className={styles.delete} onClick={handleDeletePopup}>Delete Account</button>
                    </div>
                    {sure &&(<div className={styles.modalBox}>
                        <h2 className={styles.sure}>Are you sure you want to delete your account?</h2>
                        <div>
                            <button className={styles.delete_popup} onClick={handleDeleteAccount}>Delete</button>
                            <button className={styles.save_popup} onClick={() => setSure(false)} >Cancel</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            )}
            {activeSection === "favourite" &&(<div className={styles.games_section}>
                <div className={styles.section}>
                    <hr className={styles.topLine}/>
                    <h2 className={styles.title}>My Favourite Games</h2>
                    <div className={styles.filter_results_container}>
                        {games.map((game) => (
                            <GameCard 
                                id={game.id} 
                                name={game.name}
                                price={game.price}
                                image_url={game.thumbnail_url}
                            />
                        ))}
                    </div>
                </div>
            </div>
            )}
            {activeSection === "community" &&(<div className={styles.community_section}>
                <div className={styles.section}>
                    <hr className={styles.topLine}/>
                    <h2 className={styles.title}>My Threads & Posts</h2>
                    {displayParents()}
                </div>
            </div>
            )}
    </div>
    )
}

export default Account