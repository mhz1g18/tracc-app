import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainHomeScreen from './main/MainHomeScreen'
import StatsScreen from '../../specific/StatsScreen'

const Stack = createStackNavigator()

const HomeTabScreen = props => {

    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={MainHomeScreen}/>
            <Stack.Screen name='Sleep' component={StatsScreen}/>
        </Stack.Navigator>
    )
}

export default HomeTabScreen