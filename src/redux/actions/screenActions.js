import AsyncStorage from "@react-native-async-storage/async-storage"
import { cards } from "../../screens/main/tabs/main/cards"
import { ENTER_EDIT_MODE, EXIT_EDIT_MODE, GET_CARDS, REGISTER_CARDS, TOGGLE_STATUS } from "../actiontypes/screenActionTypes"

export const enterEditMode = () => {
    return {
        type: ENTER_EDIT_MODE,
    }
}

export const exitEditMode = () => {
    return {
        type: EXIT_EDIT_MODE
    }
}

export const registerCards = (cards) => {
    return {
        type: REGISTER_CARDS,
        payload: cards,
    }
}

export const getCards = () => {
    return {
        type: GET_CARDS
    }
}

export const toggleCardStatus = (index) => {
    return {
        type: TOGGLE_STATUS,
        payload: index,
    }
}


export const fetchCards = () => {
    console.log('fetching cards from local storage'); 

    return async function(dispatch) {
        try {
            const localCards = JSON.parse(AsyncStorage.getItem('tracc_cards'))

            if(localCards) {
                dispatch(registerCards(localCards))
            } else {
                dispatch(registerCards(cards))
                AsyncStorage.setItem('tracc_cards', cards)
            }

        } catch(e) {
            dispatch(registerCards(cards))
        }
    }

}