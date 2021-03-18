import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_BASE } from "../../utils/api"
import { ADD_EXERCISE, ADD_WORKOUT, ADD_WORKOUT_EXERCISE, DELETE_EXERCISE, DELETE_WORKOUT, EDIT_EXERCISE, EDIT_WORKOUT, FETCH_EXERCISES, FETCH_EXERCISES_ERROR, FETCH_EXERCISES_SUCCESS, FETCH_WORKOUTS, FETCH_WORKOUTS_ERROR, FETCH_WORKOUTS_SUCCESS, REMOVE_WORKOUT_EXERCISE, SET_WORKOUT } from "../actiontypes/acitivitiesActionTypes"
import axios from 'axios'
import { State } from "react-native-gesture-handler"
const fetchWorkouts = () => {
    return {
        type: FETCH_WORKOUTS,
    }
}

const fetchWorkoutsSuccess = workouts => {
    return {
        type: FETCH_WORKOUTS_SUCCESS,
        payload: workouts,
    }
}

const fetchWorkoutsError = error => {
    return {
        type: FETCH_WORKOUTS_ERROR,
        payload: error,
    }
}

const deleteWorkout = id => {
    return {
        type: DELETE_WORKOUT,
        payload: id,
    }
}

const editWorkout = workout => {
    return {
        type: EDIT_WORKOUT,
        payload: workout,
    }
}

const addWorkout = workout => {
    return {
        type: ADD_WORKOUT,
        payload: workout,
    }
}


export const setActiveWorkout = workout => {
    return {
        type: SET_WORKOUT,
        payload: workout,
    }
}

export const removeWorkoutExercise = index => {
    return {
        type: REMOVE_WORKOUT_EXERCISE,
        payload: index,
    }
}

export const addWorkoutExercise = exercise => {
    return {
        type: ADD_WORKOUT_EXERCISE,
        payload: exercise,
    }
}

export const fetchWorkoutsAsync = () => {
    return async function(dispatch, getState) {
        dispatch(fetchWorkouts())
        const endpoint = `${API_BASE}/api/workouts/`
        const token = getState().auth.token

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(results.data[0].exerciseList)
            dispatch(fetchWorkoutsSuccess(results.data))
        } catch(e) {
            dispatch(fetchWorkoutsError(e))
        }
    }
}

export const deleteWorkoutAsync = (id) => {
    return async function(dispatch, getState) {
        const endpoint = `${API_BASE}/api/workouts/${id}`
        const token = getState().auth.token

        try {
            const results = await axios.delete(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(id)
            console.log(results.data)
            dispatch(deleteWorkout(id))
        } catch(e) {
        }
    }
}

export const addWorkoutAsync = workout => {
    return async function(dispatch, getState) {
        const endpoint = `${API_BASE}/api/workouts/`
        const token = getState().auth.token

        try {
            const results = await axios.post(endpoint, workout, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(addWorkout(results.data))

        } catch(e) {
            console.log(e);
        }
    }
}

export const editWorkoutAsync = workout => {
    return async function(dispatch, getState) {
        console.log(workout.id);
        const endpoint = `${API_BASE}/api/workouts/${workout.id}`
        console.log(endpoint);
        const token = getState().auth.token

        try {
            const results = await axios.put(endpoint, workout, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(editWorkout(results.data))

        } catch(e) {
            console.log(e);
        }
    }
}

const fetchExercises = () => {
    return {
        type: FETCH_EXERCISES,
    }
}

const fetchExercisesSuccess = exercises => {
    return {
        type: FETCH_EXERCISES_SUCCESS,
        payload: exercises,
    }
}

const fetchExercisesError = error => {
    return {
        type: FETCH_EXERCISES_ERROR,
        payload: error,
    }
}

const deleteExercise = id => {
    return {
        type: DELETE_EXERCISE,
        payload: id,
    }
}

const editExercise = exercise => {
    return {
        type: EDIT_EXERCISE,
        payload: exercise,
    }
}

const addExercise = exercise => {
    return {
        type: ADD_EXERCISE,
        payload: exercise,
    }
} 

export const fetchExercisesAsync = query => {
    return async function(dispatch, getState) {
        dispatch(fetchExercises())
        const endpoint = `${API_BASE}/api/exercises/${query}`
        console.log(endpoint)
        const token = getState().auth.token

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(fetchExercisesSuccess(results.data))

        } catch(e) {
            console.log(e)
            dispatch(fetchExercisesError(e))
        }
    }
}

export const deleteExerciseAsync = (id) => {
    return async function(dispatch, getState) {
        const endpoint = `${API_BASE}/api/exercises/${id}`
        const token = getState().auth.token

        try {
            const results = await axios.delete(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(deleteExercise(id))
        } catch(e) {
        }
    }
}

export const addExerciseAsync = exercise => {
    return async function(dispatch, getState) {
        const endpoint = `${API_BASE}/api/exercises/`
        const token = getState().auth.token

        try {
            const results = await axios.post(endpoint, exercise, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(addExercise(results.data))

        } catch(e) {
            console.log(e);
        }
    }
}

export const editExerciseAsync = exercise => {
    return async function(dispatch, getState) {
        console.log(exercise.id);
        const endpoint = `${API_BASE}/api/exercises/${exercise.id}`
        console.log(endpoint);
        const token = getState().auth.token

        try {
            const results = await axios.put(endpoint, exercise, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch(editExercise(results.data))

        } catch(e) {
            console.log(e);
        }
    }
}