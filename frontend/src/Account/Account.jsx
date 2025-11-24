import {useState} from 'react'
import styles from './Account/Account.module.css'

const Account = () => {

    const [generalInfo, setGeneralInfo] = useState(true);
    const [passwordSecurity, setpasswordSecurity] = useState(false);
    const [accessibilityAndGenre, setaccessibilityAndGenre] = useState(false);
    const [favouriteGames, setfavouriteGames] = useState(false);
    const [communityPosts, setcommunityPosts] = useState(false);

  return (
    <div>
        <div className={styles.nav_container}>
            <ul className={styles.nav_list}>
                <li className={styles.general_info}>General Info</li>
                <li className={styles.password_security}>Password & Security</li>
                <li className={styles.accessibility_genre}>Accessibility & Genre</li>
                <li className={styles.favourite_games}>My Favourite Games</li>
                <li className={styles.community_posts}>My Community Posts</li>
            </ul>
        </div>
        <div className={styles.account_content}>
            <div className={styles.general_info}>General Information</div>
            <div className={styles.password_security}>Password and Security</div>
            <div className={styles.accessibility_genre}>Accessibility and Genre</div>
            <div className={styles.favourite_games}>My Favourite Games</div>
            <div className={styles.community_posts}>My Community Posts</div>
        </div>
    </div>
  )
}

export default Account