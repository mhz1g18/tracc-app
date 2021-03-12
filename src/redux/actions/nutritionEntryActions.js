import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_BASE } from "../../utils/api"
import { LOAD_SEARCH_ENTRIES, SEARCH_ENTRIES } from "../actiontypes/nutritionEntryActionTypes"

const loadSearchResults = results => {
    return {
        type: LOAD_SEARCH_ENTRIES,
        payload: results,
    }
}

const searchEntries = () => {
    return {
        type: SEARCH_ENTRIES,
    }
}

export const fetchSearchResults = searchString => {
    return function(dispatch) {
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
        }

    }
}