import React from 'react'
import useAuth from '../auth/useAuth'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen'
import RootScreen from "../screens/RootScreen";
import { Text } from 'react-native'
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator()

const AppContainer = () => {

    /* const { user } = useAuth() */
    const user = useSelector(state => state.auth.user)
    
    return (
        <>
            {
            user ? 
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                </Tab.Navigator>
            :
                <RootScreen />
                
            }
        </>
    )
}


export default AppContainer