import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated } from "../endpoints/api";
import { useNavigate} from 'react-router-dom';
import { register, login, allUserEmails, step_1 } from '../endpoints/api';

const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const nav = useNavigate();

    const get_authenticated = async () => {
        try {
            const success = await is_authenticated();
            setIsAuthenticated(success);
        } catch(error){
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const login_user = async (email, password) => {
        const success = await login(email, password);
        if(success) {
            setIsAuthenticated(true)
            nav('/')
        }
        return success;
    }

    const register_user = async (first, last, user, user_password, email_address, dob, genres, accessibility) => {
        try{
            await register(first, last, user, user_password, email_address, dob, genres, accessibility)

        } catch (error){
            console.log(error)
        }
    }

    const user_usernames = async (u_user) => {
        const data = await allUserEmails();
        for (const user of data) {
            const username = user && user.username;        
            if (typeof username === "string" && u_user.trim().toLowerCase() === username.trim().toLowerCase()) {
                return false;
            }
        }
        return true;
    }

    const user_emails = async (u_email) => {
        const data = await allUserEmails();
        for (const user of data) {
            const email = user && user.email;        
            if (typeof email === "string" && u_email.trim().toLowerCase() === email.trim().toLowerCase()) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
       get_authenticated();
    }, [window.location.pathname])

    return(
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, register_user, user_usernames, user_emails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);