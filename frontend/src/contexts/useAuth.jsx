import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated } from "../endpoints/api";
import { login, allUserEmails } from '../endpoints/api';

const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

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

    const login_user = async (username, password) => {
        const success = await login(username, password);
        if(success) {
            if (window.opener) {
                window.opener.postMessage({ type: 'LOGIN_SUCCESS' }, window.location.origin);
            }
            window.close(); 
            setIsAuthenticated(true);
        }
        return success;
    }

    useEffect(() => {
       get_authenticated();
    }, [window.location.pathname])

    return(
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, user_usernames, user_emails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);