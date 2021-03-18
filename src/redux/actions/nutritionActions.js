import axios from "axios"
import { API_BASE } from "../../utils/api"
import { LOAD_NUTRITION, LOAD_NUTRITION_ERROR, LOAD_NUTRITION_SUCCESS } from "../actiontypes/nutritionActionTypes"

const fetchNutrition = () => {
    return {
        type: LOAD_NUTRITION,
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