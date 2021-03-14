import { ADD_ITEM, DELETE_ITEM, LOAD_NUTRITION, LOAD_NUTRITION_ERROR, LOAD_NUTRITION_SUCCESS, REFRESH_NUTRITION, SET_FILTERED_ITEMS } from "../actiontypes/nutritionActionTypes"

const initialState = {
    recentItems: [],
    userItems: [],
    browseItems: [],
    filteredItems: [],
    loading: true,
    refreshing: false,
    error: ''
}

const nutritionReducer = (state, action) => { 
    switch(action.type) {
        case LOAD_NUTRITION:
            return {
                ...state,
                loading: true,
            }
        case REFRESH_NUTRITION:
            return {
                ...state,
                loading: false,
                refreshing: true,
            }
        case LOAD_NUTRITION_ERROR:
            return {
                ...state,
                items: [],
                filteredItems: [],
                loading: false,
                error: action.payload
            }
        case LOAD_NUTRITION_SUCCESS:
            return {
                ...state,
                loading: false,
                refreshing: false,
                error: '',
                items: action.payload,
                filteredItems: action.payload
            }
        case SET_FILTERED_ITEMS:
            return {
                ...state,
                loading: false,
                error: '',
                filteredItems: action.payload,
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM:
            return {
                ...state,
                item: state.items.filter(item => item.id != action.payload),
                filteredItems: state.filteredItems.filter(item => item.id != action.payload)
            }
    }
}

export default nutritionReducer