import { act } from "react-test-renderer";
import { cards } from "../../screens/main/tabs/main/cards";
import { ENTER_EDIT_MODE, EXIT_EDIT_MODE, REGISTER_CARDS, TOGGLE_STATUS } from "../actiontypes/screenActionTypes";

const initialState = {
    editMode: false,
    cards: [],
}

const screenStateReducer = (state = initialState, action) => {
    console.log('Reducer being called');
    switch (action.type) {
        case ENTER_EDIT_MODE:
            return {
                ...state,
                editMode: true,
            }
        case EXIT_EDIT_MODE:
            return {
                ...state,
                editMode: false,
            }
        case REGISTER_CARDS:
            return {
                ...state,
                cards: action.payload
            }
        case TOGGLE_STATUS:
            console.log('toggle status');
            return {
                ...state,
                cards: state.cards.map((c, idx) => {
                    if(idx != action.payload) {
                        return c
                    } else {
                        return {...c, isActive: !c.isActive}
                    }
                })
            }
        default:
            return state
    }
}

export default screenStateReducer