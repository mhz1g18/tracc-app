import { combineReducers } from "redux";
import authReducer from "./authReducer";
import diaryReducer from "./diaryReducer";
import nutritionEntryReducer from "./nutritionEntryReducer";
import screenStateReducer from "./screenStateReducer";

const rootReducer = combineReducers({
    auth: authReducer, 
    screenState: screenStateReducer,
    diary: diaryReducer,
    nutritionEntry: nutritionEntryReducer
    })

export default rootReducer