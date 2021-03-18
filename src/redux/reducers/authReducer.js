import { LOGIN_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../actiontypes/authActionTypes"


const initialState = {
    loading: true,
    user: null,
    token: '',
    error: '',
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                error: '',
                loading: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                user: action.payload,
                token: action.payload.accessToken,
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: null, 
                token: '',
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                token: '',
            }
        default:
            return state
    }
}

export default authReducer