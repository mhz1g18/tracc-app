import axios from "axios"
import { API_BASE } from "../../utils/api"
import { ADD_NUTRITION_ITEM, DELETE_NUTRITION_ITEM, REFRESH_NUTRITION_SUCCESS, EDIT_NUTRITION_ITEM, LOAD_NUTRITION, SEARCH_NUTRITION_SUCCESS,LOAD_NUTRITION_ERROR, LOAD_NUTRITION_SUCCESS, SEARCH_NUTRITION,SEARCH_NUTRITION_ERROR, SET_FILTER_VALUE, REFRESH_NUTRITION, GET_RECENT_NUTRITION, GET_RECENT_NUTRITION_SUCCESS, GET_RECENT_NUTRITION_ERROR } from "../actiontypes/nutritionActionTypes"

const fetchNutrition = () => {
    return {
        type: LOAD_NUTRITION,
    }
}

const refreshNutrition = () => {
    return {
        type: REFRESH_NUTRITION,
    }
}

const refreshNutritionSuccess = nutrition => {
    return {
        type: REFRESH_NUTRITION_SUCCESS,
        payload: nutrition,
    }
}

const fetchNutritionSuccess = nutrition => {
    return {
        type: LOAD_NUTRITION_SUCCESS,
        payload: nutrition,
    }
}

const fetchNutritionError = error => {
    return {
        type: LOAD_NUTRITION_ERROR,
        payload: error,
    }
}

export const setFilterValue = searchValue => {
    return {
        type: SET_FILTER_VALUE,
        payload: searchValue,
    }
}

const deleteNutrition = id => {
    return {
        type: DELETE_NUTRITION_ITEM,
        payload: id,
    }
}

const addNutrition = nutrition => {
    return {
        type: ADD_NUTRITION_ITEM,
        payload: nutrition,
    }
}

const editNutrition = nutrition => {
    return {
        type: EDIT_NUTRITION_ITEM,
        payload: nutrition,
    }
}

export const fetchNutritionAsync = query => {
    return async function(dispatch, getState) {
        dispatch(fetchNutrition())
        const endpont = `${API_BASE}/api/nutrition/${query}`
        const token = getState().auth.token

        try {
            const results = await axios.get(endpont, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            })

            dispatch(fetchNutritionSuccess(results.data))
        } catch(e) {
            dispatch(fetchNutritionError(error))
        }
    }
}

export const refreshNutritionAsync = query => {
    return async function(dispatch, getState) {
        dispatch(refreshNutrition())
        const endpont = `${API_BASE}/api/nutrition/${query}`
        const token = getState().auth.token

        try {
            const results = await axios.get(endpont, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            })

            dispatch(refreshNutritionSuccess(results.data))
        } catch(e) {
            console.log(e)
        }
    }
}

export const deleteNutritionAsync = id => {
    return async function(dispatch, getState) {

        const endpoint = `${API_BASE}/api/nutrition/${id}`
        const token = getState().auth.token

        try {
            const result = await axios.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(result.status === 204) {
                dispatch(deleteNutrition(id))
            }else {
                throw new Error('There was a problem')
            }

        } catch(e) {
            console.log(e);
        }
    }
}

export const addNutritionAsync = nutrition => {
    return async function(dispatch, getState) {
        const endpont = `${API_BASE}/api/nutrition/`
        const token = getState().auth.token
    
        try {
            const results = await axios.post(endpont, nutrition, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            })

            dispatch(addNutrition(results.data))
    
        } catch(e) {
            console.log(e);
        }
    }
}

export const editNutritionAsync = nutrition => {
    return async function(dispatch, getState) {
        const endpont = `${API_BASE}/api/nutrition/${nutrition.id}`
        const token = getState().auth.token
    
        try {
            const results = await axios.put(endpont, nutrition, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            })

            dispatch(editNutrition(results.data))
    
        } catch(e) {
            console.log(e);
        }
    }
}


const searchNutrition = () => {
    return {
        type: SEARCH_NUTRITION,
    }
}

const searchNutritionSuccess = nutrition => {
    return {
        type: SEARCH_NUTRITION_SUCCESS,
        payload: nutrition,
    }
}

const searchNutritionError = error => {
    return {
        type: SEARCH_NUTRITION_ERROR,
        payload: error,
    }
}

export const searchNutritionAsync = searchValue => {
    return async function(dispatch, getState) {

        dispatch(searchNutrition())

        const endpoint = `${API_BASE}/api/nutrition/search?name=${searchValue}`
        const token = getState().auth.token

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(results.data)

            dispatch(searchNutritionSuccess(results.data))
        } catch(e) {
            console.log(e)
            dispatch(searchNutritionError(e))
        }
    }
}

const getRecentNutrition = () => {
    return {
        type: GET_RECENT_NUTRITION,
    }
}

const getRecentNutritionSuccess = nutrition => {
    return {
        type: GET_RECENT_NUTRITION_SUCCESS,
        payload: nutrition,
    }
}

const getRecentNutritionError = error => {
    return {
        type: GET_RECENT_NUTRITION_ERROR,
        payload: error,
    }
}

export const getRecentNutritionAsync = () => {
    return async function(dispatch, getState) {
        dispatch(getRecentNutrition())
        const endpoint = `${API_BASE}/api/user/diary/entries?type=ENTRY_NUTRITION`
        const token = getState().auth.token

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const recentItems = []

            if(Array.isArray(results.data)) {
                const length = results.data.length
                let counter = 0
                results.data.forEach((entry,) => {
                    entry.foodList.forEach(food => {
                        const index = recentItems.findIndex(item => item.id === food.id)
                        if(index < 0)
                            recentItems.push(food)
                    })
                    entry.supplementList.forEach(supp => {
                        const index = recentItems.findIndex(item => item.id === supp.id)
                        if(index < 0)
                            recentItems.push(supp)
                    })

                    counter = counter + 1

                    if(counter + 1 === length)
                        dispatch(getRecentNutritionSuccess(recentItems))
                })
            }

        } catch(e) {
            console.log(e)
            dispatch(getRecentNutritionError(e))
        }
    }
}