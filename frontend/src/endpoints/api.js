import axios from 'axios'

const BASE_URL = 'http://localhost:8000/app/users/'
const LOGIN_URL = `${BASE_URL}token/`
const LOGOUT_URL = `${BASE_URL}logout/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const USER_INFO_URL = `${BASE_URL}user/`
const AUTH_URL = `${BASE_URL}authenticated/`
const  EMAIL_USERNAME_URL = `${BASE_URL}users/`
const  STEP1_URL = `${BASE_URL}step1/`
const  STEP2_URL = `${BASE_URL}step2/`
const  STEP3_URL = `${BASE_URL}step3/`
const  STEP4_URL = `${BASE_URL}step4/`
const  STEP5_URL = `${BASE_URL}step5/`
const  FORGOT_URL = `${BASE_URL}forgot-credentials/`
const  RESET_URL = `${BASE_URL}reset-password/`
const UPDATE_PERSONAL_URL = `${BASE_URL}update-personal/`
const UPDATE_DETAILS_URL = `${BASE_URL}update-details/`
const UPDATE_PREFERENCES_URL = `${BASE_URL}update-preferences/`
const DELETE_URL = `${BASE_URL}delete-account/`
const ACCESSIBILITY_URL = `${BASE_URL}get-accessibility/`
const GENRES_URL = `${BASE_URL}get-genres/`
const CHANGE_PASSWORD_URL = `${BASE_URL}change-password/`


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
        const response = await axios.get(EMAIL_USERNAME_URL,
            { withCredentials: true}
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(EMAIL_USERNAME_URL, { withCredentials: true}))
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

export const password_reset = async (password, new_password, email) => {
    try{
        const response = await axios.post(RESET_URL,
        {new_password:new_password, password:password, email:email},
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

export const updatePersonal = async (first, last, date) => {
    try{
        const response = await axios.post(UPDATE_PERSONAL_URL,
        { first_name:first, last_name:last, dob: date},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const updateDetails = async (username, email) => {
    try{
        const response = await axios.post(UPDATE_DETAILS_URL,
        { username:username, email:email},
        { withCredentials: true }
        )
        console.log(response.data.success)
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const updatePreferences = async (genre_array, accessibility_array) => {
    try{
        const response = await axios.post(UPDATE_PREFERENCES_URL,
        { genre_arr:genre_array, accessibility_arr:accessibility_array},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAccount = async () => {
    try{
        const response = await axios.post(DELETE_URL,
        {},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const getAccessibility = async () => {
    try{
        const response = await axios.post(ACCESSIBILITY_URL,
        {},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const getGenres = async () => {
    try{
        const response = await axios.post(GENRES_URL,
        {},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (oldPass, newPass, confirmPass) => {
    try{
        const response = await axios.post(CHANGE_PASSWORD_URL,
        {oldPass:oldPass, newPass:newPass, confirmPass:confirmPass},
        { withCredentials: true }
        )
        return response.data.success;
    } catch (error) {
        console.log(error);
    }
}




