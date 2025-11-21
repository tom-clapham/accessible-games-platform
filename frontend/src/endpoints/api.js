import axios from 'axios'
import { useNavigate} from 'react-router-dom';

const BASE_URL = 'http://localhost:8000/api/'
const LOGIN_URL = `${BASE_URL}token/`
const LOGOUT_URL = `${BASE_URL}logout/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_INFO_URL = `${BASE_URL}home/`
const AUTH_URL = `${BASE_URL}authenticated/`
const  USER_URL = `${BASE_URL}users/`
const  STEP1_URL = `${BASE_URL}step1/`
<<<<<<< HEAD
=======
const  STEP2_URL = `${BASE_URL}step2/`
const  STEP3_URL = `${BASE_URL}step3/`
const  STEP4_URL = `${BASE_URL}step4/`
const  STEP5_URL = `${BASE_URL}step5/`
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc

export const user_info = async () => {
    try {
        const response = await axios.get(USER_INFO_URL,
            { withCredentials: true}
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(USER_INFO_URL, { withCredentials: true}))
    }
}

export const allUserEmails = async () => {
    try {
        const response = await axios.get(USER_URL,
            { withCredentials: true}
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(USER_URL, { withCredentials: true}))
    }
}

export const login = async (email, password) => {
    try{
        const response = await axios.post(LOGIN_URL,
        {email:email, password:password},
        { withCredentials: true }
    )
    return response.data.success
    } catch(error){
        return error
    }
}

<<<<<<< HEAD
export const register = async (first, last, user, user_password, email_address, dob, genres, accessibilities) => {
	const response = axios.post(REGISTER_URL,
		{first_name:first, last_name:last, username:user,  email:email_address, password:user_password, 
            date_of_birth:dob, genre_tags:genres, accessibility_tags:accessibilities},{ withCredentials:true }
	)
	return response.data
}

=======
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
export const refresh_token = async () => {
    try {
        await axios.post(REFRESH_URL,
            {},
            { withCredentials: true}
        )
        return true
    } catch (error) {
        return false
    }
    
}

export const call_refresh = async (error, func) => {
    if(error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token();

        if (tokenRefreshed) {
            const retryResponse = await func;
            return retryResponse.data
        }
    }
    return false
}

export const logout = async () => {
    try {
        await axios.post(LOGOUT_URL,
            {},
            { withCredentials: true}
        )
        return true

    } catch (error) {
        return false
    }
    
}

export const is_authenticated = async () => {
    try{
        await axios.post(AUTH_URL, {}, {withCredentials:true})
        return true
    } catch(error) {
        return false;
    }
}

export const step_1 = async (date_of_birth) => {
<<<<<<< HEAD
    const nav = useNavigate()
=======
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
    try{
        const response = await axios.post(STEP1_URL,
        { dob:date_of_birth },
        { withCredentials: true }
<<<<<<< HEAD
    )
    if(response.data.success){
        nav('/register/step_2')
    } else {
        console.log("ERRRPRPRPRRPR")
    }
    } catch(error){
        return error
=======
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const step_2 = async (user_email) => {
    try{
        const response = await axios.post(STEP2_URL,
        { email:user_email },
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const step_3 = async (user, password, cPassword, last, first) => {
    try{
        const response = await axios.post(STEP3_URL,
        { username:user, pass:password, cPass:cPassword, last_name:last, first_name:first },
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const step_4 = async (array) => {
    try{
        const response = await axios.post(STEP4_URL,
        { accessibility_arr:array },
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const step_5 = async (array) => {
    try{
        const response = await axios.post(STEP5_URL,
        { genre_arr:array },
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
    }
}
