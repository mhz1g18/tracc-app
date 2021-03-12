import { act } from "react-test-renderer"
import { LOAD_SEARCH_ENTRIES, SEARCH_ENTRIES } from "../actiontypes/nutritionEntryActionTypes"

const initialState = {
    searchItems: [],
    loading: false,
    itemsList: [],
}

const nutritionEntryReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SEARCH_ENTRIES:
            return {
                ...state,
                loading: false,
                searchItems: action.payload,
            }
        case SEARCH_ENTRIES:
            return {
                ...state,
                searchItems: [],
                loading: true,
            }
        default:
            return state
    }
}

export default nutritionEntryReducer