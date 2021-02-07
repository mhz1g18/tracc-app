import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SplashScreen from './login/SplashScreen'
import SignInScreen from './login/SignInScreen'
import SignUpScreen from './login/SignUpScreen'


const LoginStack = createStackNavigator()

const RootScreen = () => {

    return (
        <LoginStack.Navigator headerMode='none'>
            <LoginStack.Screen name="SplashScreen" component={SplashScreen}/>
            <LoginStack.Screen name="SignInScreen"  component={SignInScreen} />
            <LoginStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </LoginStack.Navigator>
    )
}


export default RootScreen