import { ADD_NUTRITION_ITEM, DELETE_NUTRITION_ITEM, EDIT_NUTRITION_ITEM, SEARCH_NUTRITION_ERROR, LOAD_NUTRITION, LOAD_NUTRITION_ERROR, LOAD_NUTRITION_SUCCESS, SEARCH_NUTRITION_SUCCESS, SEARCH_NUTRITION, SET_FILTER_VALUE, REFRESH_NUTRITION, REFRESH_NUTRITION_SUCCESS, GET_RECENT_NUTRITION, GET_RECENT_NUTRITION_SUCCESS, GET_RECENT_NUTRITION_ERROR } from "../actiontypes/nutritionActionTypes"

const initialState = {
    items: [],
    loading: true,
    refreshing: false,
    searchItems: [],
    searchLoading: false,
    recentItems: [],
    recentLoading: false,
    error: '',
    filterValue: '',
}

const nutritionReducer = (state = initialState, action) => { 
    switch(action.type) {
        case LOAD_NUTRITION: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOAD_NUTRITION_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                loading: false,
                refreshing: false,
            }
        }
        case LOAD_NUTRITION_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        case REFRESH_NUTRITION: {
            return {
                ...state,
                refreshing: true,
            }
        }
        case REFRESH_NUTRITION_SUCCESS: {
            return {
                ...state,
                refreshing: false,
                items: action.payload,
            }
        }
        case SET_FILTER_VALUE: {
            return {
                ...state,
                filterValue: action.payload,
            }
        }
        case DELETE_NUTRITION_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        }
        case EDIT_NUTRITION_ITEM: {
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.id ? action.payload : item)
            }
        }
        case ADD_NUTRITION_ITEM: {
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        }
        case SEARCH_NUTRITION: {
            return {
                ...state,
                searchLoading: true,
            }
        }
        case SEARCH_NUTRITION_SUCCESS: {
            return {
                ...state,
                searchLoading: false,
                searchItems: action.payload,
            }
        }
        case SEARCH_NUTRITION_ERROR: {
            return {
                ...state,
                searchLoading: false,
                error: action.payload,
            }
        }
        case GET_RECENT_NUTRITION: {
            return {
                ...state,
                recentLoading: true,
            }
        }
        case GET_RECENT_NUTRITION_SUCCESS: {
            return {
                ...state,
                recentLoading: false,
                recentItems: action.payload,
            }
        }
        case GET_RECENT_NUTRITION_ERROR: {
            return {
                ...state,
                recentLoading: false,
                error: action.payload,
            }
        }
        default:
            return state
    }
}

export default nutritionReducer