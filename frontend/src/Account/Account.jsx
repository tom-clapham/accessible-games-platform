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
import { IoIosWarning } from "react-icons/io";
import SearchBarGenres from '../Components/SearchBars/SearchBarGenres'
import SearchBarAccessibility from '../Components/SearchBars/SearchBarAccessibility'
import { TiDelete } from "react-icons/ti";

const Account = () => {

    const [info, setInfo] = useState({accessibility_tags: [], genre_tags: []})
    const location = useLocation();
    const { message } = location.state || {};
    const [activeSection, setActiveSection] = useState("details");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

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
                        <li className={`${styles.list_details} ${activeSection === "details" ? styles.navActive : ""}`} onClick={() => handleSectionChange("details")}><CiUser  className={styles.icon}/>Personal Details</li>
                        <li className={`${styles.list_settings} ${activeSection === "account" ? styles.navActive : ""}`} onClick={() => handleSectionChange("account")}><CiSettings className={styles.icon}/>Account Settings</li>
                        <li className={`${styles.list_security} ${activeSection === "security" ? styles.navActive : ""}`} onClick={() => handleSectionChange("security")}><TbLockPassword className={styles.icon}/>Password and Security</li>
                        <li className={`${styles.list_preferences} ${activeSection === "preferences" ? styles.navActive : ""}`} onClick={() => handleSectionChange("preferences")}><IoAccessibilityOutline className={styles.icon}/>Personal Preferences</li>
                        <li className={`${styles.list_delete} ${activeSection === "delete" ? styles.navActive : ""}`} onClick={() => handleSectionChange("delete")}><MdDeleteOutline className={styles.icon}/>Delete Account</li>
                    </ul>
                    <hr className={styles.line}/>
                    <ul className={styles.favourites_list}>
                        <li className={styles.favourite_games_nav}>My Favourite Games</li>
                        <li className={`${styles.list_favourited} ${activeSection === "favourite" ? styles.navActive : ""}`} onClick={() => handleSectionChange("favourite")}><FaRegHeart className={styles.icon2}/>View favourited games</li>
                    </ul>
                    <hr className={styles.line}/>
                    <ul className={styles.community_list}>
                        <li className={styles.community_posts_nav}>My Community Posts</li>
                        <li className={`${styles.list_community} ${activeSection === "community" ? styles.navActive : ""}`} onClick={() => handleSectionChange("community")}><FaRegCommentDots className={styles.icon2}/>View community posts</li>
                    </ul>
                </ul>
            </div>
            <div className={styles.account_content}>
                {activeSection === "details" &&(<div className={styles.section}>
                    <h2 className={styles.title}>Personal Details</h2>
                    <h3>Manage your name and contact info. These personal details are private and will not be displayed to other users.</h3>
                    <div className={styles.nameContainer}>
                        <div className={styles.firstContainer}>
                            <label className={styles.label}>First Name</label>
                            <input className={styles.input} required maxLength='100' type='text' placeholder={info.first_name} onChange={(e) => setFirst(e.target.value)}></input>
                        </div>
                        <div className={styles.lastContainer}>
                            <label className={styles.label}>Last Name</label>
                            <input className={styles.input} required maxLength='100' type='text' placeholder={info.last_name} onChange={(e) => setLast(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={styles.elements}>
                        <label className={styles.label}>Date of birth</label>
                        <div className={styles.dropdown}>
                            <select className={styles.input} required onChange={(e) => setDay(e.target.value)}>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>))}
                            </select>
                            <select className={styles.input} required onChange={(e) => setMonth(e.target.value)}>
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
                            <input className={styles.input} type='text' placeholder='Year' maxLength='4' onChange={(e) => setYear(e.target.value)}></input>
                        </div>
                    </div>
                    <button className={styles.save}>Save Changes</button>
                    <hr/>
                </div>
                )}
                {activeSection === "account" &&(<div className={styles.section}>
                    <h2 className={styles.title}>Account Information</h2>
                    <h3>Manage your username and email. Your username is unique to you, so get creative!</h3>
                    <div className={styles.accountContainer}>
                        <div className={styles.usernameContainer}>
                            <label className={styles.label}>Username</label>
                            <input className={styles.input} required maxLength='100' type='text' placeholder={info.username} onChange={(e) => setFirst(e.target.value)}></input>
                        </div>
                        <div className={styles.emailContainer}>
                            <label className={styles.label}>Email</label>
                            <input className={styles.input} required maxLength='100' type='text' placeholder={info.email} onChange={(e) => setLast(e.target.value)}></input>
                        </div>
                    </div>
                    <button className={styles.save}>Save Changes</button>
                    <hr/>
                </div>
                )}
                {activeSection === "security" &&(<div className={styles.section}>
                    <h2 className={styles.title}>Password & Security</h2>
                    <h3>Change your password and enable 2FA. We recommend doing this, it keeps your account more secure.</h3>
                    <div className={styles.securityButtons}>
                        <button className={styles.save}>Change password</button>
                        <button className={styles.save}>Enable 2FA</button>
                    </div>
                    <hr/>
                </div>
                )}
                {activeSection === "preferences" &&(<div className={styles.section}>
                    <h2 className={styles.title}>Accessibility & Genres</h2>
                    <h3>Manage your accessibility needs and favourite game genres here, this helps us tailor your experience.</h3>
                    <div className={styles.accessibility_section}>
                        <span>Accessibility Preferences</span>
                        <ul className={styles.accessibility_list}>
                            {info.accessibility_tags?.map((tag, i) => (
                            <li key={i + 1}>
                                {tag}<TiDelete className={styles.cross}/>
                            </li>))}
                        </ul>
                        <SearchBarAccessibility/>
                    </div>
                    <div className={styles.genres_section}>
                        <span>Game Genre Preferences</span>
                        <ul className={styles.genre_list}>
                            {info.genre_tags?.map((tag, i) => (
                            <li key={i + 1}>
                                {tag}<TiDelete className={styles.cross}/>
                            </li>))}
                        </ul>
                        <SearchBarGenres/>
                    </div>
                    <button className={styles.save}>Save Changes</button>
                    <hr/>
                </div>
                )}
                {activeSection === "delete" &&(<div className={styles.section}>
                    <h2 className={styles.title}>Delete Account</h2>
                    <h3>Permanently delete your account including all personal information, favourite games,
                        accessibility preferences and genre preferences. You will not be able to recover it thereafter.</h3>
                    <button className={styles.delete}>Delete Account</button>
                    <hr/>
                </div>
                )}
                {activeSection === "favourite" &&(<div className={styles.list_settings}>
                    <h2 className={styles.title}>My Favourite Games</h2>
                </div>
                )}
                {activeSection === "community" &&(<div className={styles.list_settings}>
                    <h2 className={styles.title}>My Threads & Posts</h2>
                </div>
                )}
            </div>
        </div>
    )
}

export default Account