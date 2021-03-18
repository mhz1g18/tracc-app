import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
import SplashScreenContainer from '../../../components/SplashScreenContainer'
import ExerciseFormScreen from './activities/ExerciseFormScreen'
import ExercisesScreen from './activities/ExercisesScreen'
import MainActivitiesScreen from './activities/MainActivitiesScreen'
import WorkoutScreen from './activities/WorkoutScreen'

const Stack = createStackNavigator()

const ActivitiesTabScreen = props => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='WorkoutsScreen' component={MainActivitiesScreen}/>
            <Stack.Screen name='WorkoutScreen' component={WorkoutScreen}/>
            <Stack.Screen name='ExercisesScreen' component={ExercisesScreen} />
            <Stack.Screen name='ExerciseFormScreen' component={ExerciseFormScreen} />
        </Stack.Navigator>
    )
}

export default ActivitiesTabScreen