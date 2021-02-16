import { API_BASE } from "../../utils/api"
import { FETCH_USER, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER } from "../actiontypes/authActionTypes"
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

 const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST,
    }
}

 const loginUserSuccess = user => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user,
    }
}

 const loginUserError = error => {
    return {
        type: LOGIN_USER_ERROR,
        payload: error,
    }
}

export const fetchUser = () => {
    console.log('fetch user');
    return async function(dispatch) {
        console.log('fetching user from local storage');

        setTimeout(async () => {
            try {
                const user = await AsyncStorage.getItem('traccUser')
                if(user) {
                    console.log('user found');
                    dispatch(loginUserSuccess(JSON.parse(user)))
                } else {
                    console.log('user not found');
                    dispatch(loginUserError('test'))
                }
            } catch(e) {
                console.log(e)
                dispatch(loginUserError(e))
            }
        }, 1500);
    }
}

export const loginUser = request => {
    return function(dispatch) {
        console.log(request);
        dispatch(loginUserRequest())
        const endpoint = `${API_BASE}/api/auth/signin`
            console.log(endpoint);
            axios.post(endpoint, request) /* /api/auth/signin */
             .then(response => {
                 console.log('haha');
                 console.log(response.data)
                 const user = response.data

                if(!(user.accessToken)) {
                    throw Error('Invalid credentials')
                }

                 try {
                     AsyncStorage.setItem('traccUser', JSON.stringify(user))
                 } catch(e) {
                     console.log(e);
                     throw e
                 }

                 dispatch(loginUserSuccess(user))
             })
             .catch(error => {
                 console.log(error);
                 dispatch(loginUserError(error))
             })
    }
}

export const signUpUser = request => {
    return function(dispatch) {
        console.log('reqeust is ');
        console.log(request);
        dispatch(loginUserRequest())
        const endpoint = `${API_BASE}/api/auth/signup`
            console.log(endpoint);
            console.log('sign up user');
            axios.post(endpoint, request) /* /api/auth/signin */
             .then(response => {
                 console.log(response.data)
                 const user = response.data

                if(!(user.accessToken)) {
                    throw Error('Some error stuff')
                }

                 try {
                     AsyncStorage.setItem('traccUser', JSON.stringify(user))
                 } catch(e) {
                     console.log(e);
                     throw e
                 }

                 dispatch(loginUserSuccess(user))
             })
             .catch(error => {
                 console.log(error);
                 dispatch(loginUserError(error))
             })
    }
}

