import { LOAD_NUTRITION, LOAD_NUTRITION_ERROR, LOAD_NUTRITION_SUCCESS } from "../actiontypes/nutritionActionTypes"

const initialState = {
    items: [],
    filteredItems: [],
    loading: true,
    refreshing: false,
    error: ''
}

const nutritionReducer = (state, action) => { 
    switch(action.type) {
        case LOAD_NUTRITION: {
            return {
                ...state,
                loading: false,
            }
        }
        case LOAD_NUTRITION_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                filteredItems: action.payload,
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
    }
}

export default nutritionReducer