import { LOAD_NUTRITION } from "../actiontypes/nutritionActionTypes"

const loadNutrition = () => {
    return {
        type: LOAD_NUTRITION
    }
}

const loadNutritionSuccess = data => {
    return {
        type: LOAD_NUTRITION,
        payload: data,
    }
}

const loadNutritionError = error => {
    return {
        type: LOAD_NUTRITION,
        payload: error,
    }
}