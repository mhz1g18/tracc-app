import { combineReducers } from "redux";
import authReducer from "./authReducer";
import diaryReducer from "./diaryReducer";
import nutritionEntryReducer from "./nutritionEntryReducer";
import nutritionReducer from "./nutritionReducer";
import screenStateReducer from "./screenStateReducer";
import workoutReducer from "./workoutReducer";

const rootReducer = combineReducers({
    auth: authReducer, 
    screenState: screenStateReducer,
    diary: diaryReducer,
    nutritionEntry: nutritionEntryReducer,
    activities: workoutReducer,
    nutrition: nutritionReducer,
    })

export default rootReducer