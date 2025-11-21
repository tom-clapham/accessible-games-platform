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
            <h1>User successfully created</h1>
        </div>
    )
}

export default Home;