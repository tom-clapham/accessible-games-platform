import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { user_info, logout } from './endpoints/api';

function Home() {
    const [info, setInfo] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            const info = await user_info()
            setInfo(info);
        }
        fetchInfo();
    }, [])

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            nav('/login')
        }
    }

    return(
        <div>
            <h1>Hello World</h1>
            {info ? (
                <div>
                <p>Username: {info.username}</p>
                <p>Email: {info.email}</p>
                <p>First name: {info.first_name}</p>
                <p>Last name: {info.last_name}</p>
                <p>Date of Birth: {info.date_of_birth}</p>
                <p>Favourite Genres: {info.genre_tags}</p>
                <p>Accessibility Needs: {info.accessibility_tags}</p>
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;