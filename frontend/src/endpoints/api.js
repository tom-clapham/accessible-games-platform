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
const  STEP2_URL = `${BASE_URL}step2/`
const  STEP3_URL = `${BASE_URL}step3/`
const  STEP4_URL = `${BASE_URL}step4/`
const  STEP5_URL = `${BASE_URL}step5/`
const  FORGOT_URL = `${BASE_URL}forgot-credentials/`

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

export const login = async (user, password) => {
    try{
        const response = await axios.post(LOGIN_URL,
        {username:user, password:password},
        { withCredentials: true }
    )
    return response.data.success
    } catch(error){
        return error
    }
}

export const forgot_info = async (email, type) => {
    try{
        const response = await axios.post(FORGOT_URL,
        {email:email, from:type},
        { withCredentials: true }
    )
    return response.data.success
    } catch(error){
        return error
    }
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

export const step_1 = async (date_of_birth) => {
    try{
        const response = await axios.post(STEP1_URL,
        { dob:date_of_birth },
        { withCredentials: true }
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
    }
}
