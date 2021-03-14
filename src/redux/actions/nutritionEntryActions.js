import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_BASE } from "../../utils/api"
import { ADD_ITEM_TO_ENTRY, LOAD_SEARCH_ENTRIES, SEARCH_ENTRIES, REMOVE_ITEM_FROM_ENTRY, RESET_SEARCH_ENTRIES, LOAD_ENTRIES, RESET_ENTRIES, LOAD_NUTRITION_ENTRIES } from "../actiontypes/nutritionEntryActionTypes"
import axios from 'axios'
import nutritionEntryReducer from "../reducers/nutritionEntryReducer"

const loadSearchResults = results => {
    return {
        type: LOAD_SEARCH_ENTRIES,
        payload: results,
    }
}

const resetSearchResults = () => {
    return {
        type: RESET_SEARCH_ENTRIES,
    }
}

const searchEntries = () => {
    return {
        type: SEARCH_ENTRIES,
    }
}

export const fetchSearchResults = searchString => {
    return async function(dispatch) {

        if(searchString.length < 3) {
            dispatch(resetSearchResults())
            return
        }

        dispatch(searchEntries())
        const endpoint = `${API_BASE}/api/nutrition/search?name=${searchString}`
        const token = await AsyncStorage.getItem('traccToken')

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(loadSearchResults(results.data))

        } catch(e) {
            console.log(e)
        }

    }
}

export const addEntry = entry => {
    return {
        type: ADD_ITEM_TO_ENTRY,
        payload: entry,
    }
}

export const removeEntry = entry => {
    return {
        type: REMOVE_ITEM_FROM_ENTRY,
        payload: entry
    }
}

export const resetEntries = () => {
    return {
        type: RESET_ENTRIES,
    }
}

export const loadEntries = entries => {
    return {
        type: LOAD_NUTRITION_ENTRIES,
        payload: entries
    }
}
