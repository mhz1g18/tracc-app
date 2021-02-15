import { createStackNavigator } from '@react-navigation/stack'
import React, { lazy } from 'react'

import SplashScreen from './login/SplashScreen'
import SignInScreen from './login/SignInScreen'
import SignUpInfoScreen from './login/SignUpInfoScreen'
import SignUpLoginScreen from './login/SignUpLoginScreen'



const LoginStack = createStackNavigator()

const RootScreen = () => {

    return (
        <LoginStack.Navigator headerMode='none'>
            <LoginStack.Screen name="SplashScreen" component={SplashScreen}/>
            <LoginStack.Screen name="SignInScreen"  component={SignInScreen} />
            <LoginStack.Screen name="SignUpInfoScreen" component={SignUpInfoScreen}/>
            <LoginStack.Screen name="SignUpLoginScreen" component={SignUpLoginScreen} />
        </LoginStack.Navigator>
    )
}


export default RootScreen