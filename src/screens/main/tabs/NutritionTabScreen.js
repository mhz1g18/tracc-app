import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainNutrtionScreen from './nutrition/MainNutritionScreen'
import SupplementFormScreen from './nutrition/NutritionFormScreen'
import MicronutrientsSreen from './nutrition/MicronutrientsScreen'

const Stack = createStackNavigator()

const NutritionTabScreen = props => {

    return (
        <Stack.Navigator initialRouteName='Nutrition' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Nutrition' component={MainNutrtionScreen}/>
            <Stack.Screen name='NutritionForm'  component={SupplementFormScreen}/>
            <Stack.Screen name='MicronutrientsScreen' component={MicronutrientsSreen}/>
        </Stack.Navigator>
    )

}

export default NutritionTabScreen