import {useState, useEffect} from 'react'
import { user_info } from '../endpoints/api'
import styles from './Account.module.css'
import { useLocation } from 'react-router-dom'

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
        <div>
            <div className={styles.nav_container}>
                <ul className={styles.nav_list}>
                    <li className={styles.general_info}>General Info</li>
                    <li className={styles.favourite_games}>My Favourite Games</li>
                    <li className={styles.community_posts}>My Community Posts</li>
                </ul>
            </div>
            <div className={styles.account_content}>
                <div className={styles.general_info}>
                    <h1 className={styles.title}>General Information</h1>
                    <div>
                        <span>Name: {info.first_name + ' ' + info.last_name}</span>
                        <span>Username: {info.username}</span>
                        <span>Email: {info.email}</span>
                        <span>Date of Birth: {info.date_of_birth}</span>
                        <span>Password: {info.password}</span>
                        <span>Accessibility Preferences: {info.accessibility_tags}</span>
                        <span>Game Genre Preferences: {info.genre_tags}</span>
                    </div>
                </div>
                <div className={styles.favourite_games}>
                    <h1 className={styles.title}>My Favourite Games</h1>
                </div>
                <div className={styles.community_posts}>
                    <h1 className={styles.title}>My Community Posts</h1>
                </div>
            </div>
        </div>
    )
}

export default Account