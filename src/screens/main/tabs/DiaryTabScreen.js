import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import NutritionEntryScreen from './diary/entries/NutritionEntryScreen'
import SleepEntryScreen from './diary/entries/SleepEntryScreen'
import MainDiaryScreen from './diary/MainDiaryScreen'

const Stack = createStackNavigator()

const DairyTabScreen = props => {

    return (
        <Stack.Navigator initialRouteName='Diary' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Diary' component={MainDiaryScreen}/>
            <Stack.Screen name='Sleep' component={SleepEntryScreen} />
            <Stack.Screen name='Nutrition' component={NutritionEntryScreen}/>
        </Stack.Navigator>
    )
}

export default DairyTabScreen