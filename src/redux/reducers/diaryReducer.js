import { ADD_ENTRY, DELETE_ENTRY, EDIT_ENTRY, LOAD_ENTRIES, LOAD_ENTRIES_ERROR, LOAD_ENTRIES_SUCCESS } from "../actiontypes/diaryActionTypes"

const initialState = {
    data: [],
    loading: true,
    error: ''
}

const diaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ENTRIES:
            return {
                ...state,
                loading: true,
            }
        case LOAD_ENTRIES_ERROR:
            return {
                ...state,
                data: [],
                error: action.paylad
            }
        case LOAD_ENTRIES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case DELETE_ENTRY:
            return {
                ...state,
                data: state.data.filter(entry => entry.id != action.payload)
            }
        case ADD_ENTRY:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case EDIT_ENTRY:
            return {
                ...state,
                data: state.data.map(item => item.id === action.payload.id ? action.payload : item)
            }
        default:
            return state
    }
}

export default diaryReducer