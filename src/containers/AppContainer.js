import React from 'react'
import useAuth from '../auth/useAuth'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RootScreen from "../screens/RootScreen";
import { Text } from 'react-native'
import { useSelector } from 'react-redux';
import MainScreen from '../screens/main/MainScreen';
const Tab = createBottomTabNavigator()

const AppContainer = () => {

    /* const { user } = useAuth() */
    const user = useSelector(state => state.auth.user)
    
    return (
        <>
            {
            user ? 
            <MainScreen />
            :
            <RootScreen />
            }
        </>
    )
}


export default AppContainer