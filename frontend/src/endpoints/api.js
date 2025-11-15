import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/'
const LOGIN_URL = `${BASE_URL}token/`
const LOGOUT_URL = `${BASE_URL}logout/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_INFO_URL = `${BASE_URL}home/`
const AUTH_URL = `${BASE_URL}authenticated/`
const  REGISTER_URL = `${BASE_URL}register/`
const  USER_URL = `${BASE_URL}users/`


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


export const register = async (first, last, user, user_password, email_address, dob, genres, accessibilities) => {
	const response = axios.post(REGISTER_URL,
		{first_name:first, last_name:last, username:user,  email:email_address, password:user_password, 
            date_of_birth:dob, genre_tags:genres, accessibility_tags:accessibilities},{ withCredentials:true }
	)
	return response.data
}

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
