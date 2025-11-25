import {useState, useEffect} from 'react'
import { user_info } from '../endpoints/api'
import styles from './Account.module.css'
import { useLocation } from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoAccessibilityOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";

const Account = () => {

    const [info, setInfo] = useState(false);
    const [generalInfo, setGeneralInfo] = useState(true);
    const [passwordSecurity, setpasswordSecurity] = useState(false);
    const [accessibilityAndGenre, setaccessibilityAndGenre] = useState(false);
    const [favouriteGames, setfavouriteGames] = useState(false);
    const [communityPosts, setcommunityPosts] = useState(false);
    const location = useLocation();
    const { message } = location.state || {};

    useEffect(() => {
        const fetchInfo = async () => {
        const info = await user_info();
            setInfo(info);
        }

        if(message){
            fetchInfo();
        }
    }, []);

    return (
        <div className={styles.settings_container}>
            <div className={styles.nav_container}>
                <ul className={styles.nav_list}>
                    <ul className={styles.account_list}>
                        <li className={styles.list_header}>My Account</li>
                        <li className={styles.list_details}><CiUser className={styles.icon}/>Personal Details</li>
                        <li className={styles.list_settings}><CiSettings className={styles.icon}/>Account Settings</li>
                        <li className={styles.list_security}><TbLockPassword className={styles.icon}/>Password and Security</li>
                        <li className={styles.list_preferences}><IoAccessibilityOutline className={styles.icon}/>Personal Preferences</li>
                        <li className={styles.list_delete}><MdDeleteOutline className={styles.icon}/>Delete Account</li>
                    </ul>
                    <hr/>
                    <ul className={styles.favourites_list}>
                        <li className={styles.favourite_games_nav}>My Favourite Games</li>
                        <li className={styles.list_favourited}><FaRegHeart className={styles.icon2}/>View favourited games</li>
                    </ul>
                    <hr/>
                    <ul className={styles.community_list}>
                        <li className={styles.community_posts_nav}>My Community Posts</li>
                        <li className={styles.list_community}><FaRegCommentDots className={styles.icon2}/>View community posts</li>
                    </ul>
                </ul>
            </div>
            <div className={styles.account_content}>
                <div className={styles.general_info}>
                    <h1>Settings</h1>
                    <h3>Manage your account's details.</h3>
                    <div>
                        <h2 className={styles.title}>Personal Details</h2>
                        <span>Name: {info.first_name + ' ' + info.last_name}</span>
                        <span>Date of Birth: {info.date_of_birth}</span>
                    </div>
                    <div>
                        <h2 className={styles.title}>Account Information</h2>
                        <span>Username: {info.username}</span>
                        <span>Email: {info.email}</span>
                    </div>
                    <div>
                        <h2 className={styles.title}>Password & Security</h2>
                        <button>Change password</button>
                        <button>Enable 2FA</button>
                    </div>
                    <div>
                        <h2 className={styles.title}>Accessibility & Genres</h2>
                        <span>Accessibility Preferences: {info.accessibility_tags}</span>
                        <span>Game Genre Preferences: {info.genre_tags}</span>
                    </div>
                    <div>
                        <h2 className={styles.title}>Delete Account</h2>
                        <button>delete account</button>
                    </div>
                    <div>
                        <h2 className={styles.title}>My Favourite Games</h2>
                    </div>
                    <div>
                        <h2 className={styles.title}>My Threads & Posts</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account