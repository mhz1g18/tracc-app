import { ADD_EXERCISE, ADD_WORKOUT, ADD_WORKOUT_EXERCISE, DELETE_EXERCISE, DELETE_WORKOUT, EDIT_EXERCISE, EDIT_WORKOUT, FETCH_EXERCISES, FETCH_EXERCISES_SUCCESS, FETCH_WORKOUTS, FETCH_WORKOUTS_ERROR, FETCH_WORKOUTS_SUCCESS, REMOVE_WORKOUT_EXERCISE, SET_WORKOUT } from "../actiontypes/acitivitiesActionTypes"

const initialState = {
    workouts: [],
    exercises: [],
    loadingWorkouts: false,
    loadingExercises: false,
    currentWorkout: {},
    error: '',
}

const workoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_WORKOUTS: {
            return {
                ...state,
                loadingWorkouts: true,
            }
        }
        case FETCH_WORKOUTS_SUCCESS: {
            return {
                ...state,
                loadingWorkouts: false,
                workouts: action.payload, 
                error: '',
            }
        }
        case FETCH_WORKOUTS_ERROR: {
            return {
                ...state,
                loadingWorkouts: false,
                error: action.payload, 
            }
        }
        case DELETE_WORKOUT: {
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout.id !== action.payload)
            }
        }
        case ADD_WORKOUT: {
            return {
                ...state,
                workouts: [...state.workouts, action.payload]
            }
        }
        case EDIT_WORKOUT: {
            return {
                ...state,
                workouts: state.workouts.map(wrk => wrk.id === action.payload.id ? action.payload : wrk)
            }
        }
        case SET_WORKOUT: {
            return {
                ...state,
                currentWorkout: action.payload
            }
        }
        case REMOVE_WORKOUT_EXERCISE: {
            return {
                ...state,
                currentWorkout: {
                    ...state.currentWorkout,  
                    exerciseList: state.currentWorkout.exerciseList.filter(ex => ex.id !== action.payload),
                },
            }
        }
        case ADD_WORKOUT_EXERCISE:
            return {
                ...state,
                currentWorkout: {
                    ...state.currentWorkout,
                    exerciseList: [...state.currentWorkout.exerciseList, action.payload],
                },
            }
        case FETCH_EXERCISES: {
            return {
                ...state,
                loadingExercises: true,
                exercises: []
            }
        }
        case FETCH_EXERCISES_SUCCESS: {
            return {
                ...state,
                loadingExercises: false,
                exercises: action.payload,
            }
        }
        case FETCH_WORKOUTS_ERROR:{
            return {
                ...state,
                loadingExercises: false,
                error: action.payload
            }
        }
        case DELETE_EXERCISE: {
            return {
                ...state,
                exercises: state.exercises.filter(exercise => exercise.id !== action.payload),
            }
        }
        case ADD_EXERCISE: {
            return {
                ...state,
                exercises: [...state.exercises, action.payload]
            }
        }
        case EDIT_EXERCISE: {
            return {
                ...state,
                exercises: state.exercises.map(exercise => exercise.id === action.payload.id ? action.payload : exercise)
            }
        }
        default:
            return state
    }
}

export default workoutReducer