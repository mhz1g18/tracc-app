import { LOAD_SEARCH_ENTRIES, RESET_ENTRIES, SEARCH_ENTRIES, ADD_ITEM_TO_ENTRY, REMOVE_ITEM_FROM_ENTRY, RESET_SEARCH_ENTRIES, LOAD_ENTRIES, LOAD_NUTRITION_ENTRIES, } from "../actiontypes/nutritionEntryActionTypes"

const initialState = {
    searchItems: [],
    itemsList: [],
}

const nutritionEntryReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SEARCH_ENTRIES:
            return {
                ...state,
                searchItems: action.payload,
            }
        case RESET_SEARCH_ENTRIES:
            return {
                ...state,
                searchItems: []
            }
        case SEARCH_ENTRIES:
            return {
                ...state,
                searchItems: [],
            }
        case ADD_ITEM_TO_ENTRY:
            return {
                ...state,
                itemsList: [...state.itemsList, action.payload]
            }
        case REMOVE_ITEM_FROM_ENTRY:
            return {
                ...state,
                itemsList: state.itemsList.filter(item => item.id !== action.payload.id)
            }
        case RESET_ENTRIES:
            return {
                ...state,
                itemsList: []
            }
        case LOAD_NUTRITION_ENTRIES:
            return {
                ...state,
                itemsList: action.payload,
            }
        default:
            return state
    }
}

export default nutritionEntryReducer