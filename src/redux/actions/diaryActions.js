import axios from "axios"
import { API_BASE } from "../../utils/api"
import { ADD_ENTRY, DELETE_ENTRY, EDIT_ENTRY, LOAD_ENTRIES, LOAD_ENTRIES_ERROR, LOAD_ENTRIES_SUCCESS } from "../actiontypes/diaryActionTypes"
import AsyncStorage from "@react-native-async-storage/async-storage"

const loadEntries = () => {
    return {
        type: LOAD_ENTRIES,
    }
}

const loadEntriesSuccess = entries => {
    return {
        type: LOAD_ENTRIES_SUCCESS,
        payload: entries,
    }
}

const loadEntriesError = error => {
    return {
        type: LOAD_ENTRIES_ERROR,
        payload: error,
    }
}

const deleteEntry = id => {
    return {
        type: DELETE_ENTRY,
        payload: id,
    }
}

const replaceEntry = entry => {
    return {
        type: EDIT_ENTRY,
        payload: entry,
    }
}

const addEntry = entry => {
    return {
        type: ADD_ENTRY,
        payload: entry,
    }
}

export const getEntriesForDate = date => {
    return  async function(dispatch) {
        dispatch(loadEntries())
        const queryDate = date.toISOString().split('T')[0]
        const endpoint = `${API_BASE}/api/user/diary/entries?date=${queryDate}`
        const token = await AsyncStorage.getItem('traccToken')
        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(loadEntriesSuccess(results.data.diaryEntries))
        } catch(e) {
            dispatch(loadEntriesError(e))
        }

    }
}

export const addEntryAsync = entry => {
    return async function(dispatch) {
        const endpoint = `${API_BASE}/api/user/diary/entries/`
        const token = await AsyncStorage.getItem('traccToken')
        try {
            const result = await axios.post(endpoint, entry, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(addEntry(result.data))
        } catch(e) {
            console.log(e);
        }
    }
}

export const editEntryAsync = entry => { 
    return async function(dispatch) {
        const { id } = entry
        const endpoint = `${API_BASE}/api/user/diary/entries/${entry.id}`
        const token = await AsyncStorage.getItem('traccToken')
        delete entry.id

        try {
            const result = await axios.put(endpoint, entry, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result.data)
            dispatch(replaceEntry(result.data))
        } catch(e) {
            console.log('error here');
            console.log(e);
        }
    }
}

export const deleteEntryAsync = entry => { 
    return async function(dispatch) {
        const endpoint = `${API_BASE}/api/user/diary/entries/${entry.id}`
        const token = await AsyncStorage.getItem('traccToken')
        try {
            const result = await axios.delete(endpoint, entry, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(deleteEntry(entry.id))
        } catch(e) {
            console.log('error here');
            console.log(e);
        }
    }
}



