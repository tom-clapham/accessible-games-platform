import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated } from "../endpoints/api";
import { useNavigate} from 'react-router-dom';
import { register, login } from '../endpoints/api';

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

    const register_user = async (first, last, user, user_password, email_address, dob) => {
        try{
            await register(first, last, user, user_password, email_address, dob)

        } catch (error){
            console.log(error)
        }

    }

    useEffect(() => {
       get_authenticated();
    }, [window.location.pathname])

    return(
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, register_user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);