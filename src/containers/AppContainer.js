import React from 'react'
import RootScreen from "../screens/RootScreen";
import { useSelector } from 'react-redux';
import MainScreen from '../screens/main/MainScreen';

const AppContainer = () => {

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