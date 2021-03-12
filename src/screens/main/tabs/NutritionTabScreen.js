import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainNutrtionScreen from './nutrition/MainNutritionScreen'
import NutritionFormScreen from './nutrition/NutritionFormScreen'

const Stack = createStackNavigator()

const NutritionTabScreen = props => {

    return (
        <Stack.Navigator initialRouteName='Nutrition' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Nutrition' component={MainNutrtionScreen}/>
            <Stack.Screen name='NutritionForm'  component={NutritionFormScreen}/>
        </Stack.Navigator>
    )

}

export default NutritionTabScreen