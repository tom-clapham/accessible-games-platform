import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { user_info, logout } from './endpoints/api';


function Home() {
    const nav = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            nav('/login')
        }
    }

    return(
        <div>
            <h1>HOME PAGE</h1>
        </div>
    )
}

export default Home;