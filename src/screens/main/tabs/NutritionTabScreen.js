import React from 'react'
import { Text } from 'react-native'
import SplashScreenContainer from '../../../components/SplashScreenContainer'
import { createStackNavigator } from '@react-navigation/stack'
import {Header} from 'react-native-elements'
import { colors } from '../../../colors'
import MainNutrtionScreen from './nutrition/MainNutritionScreen'

const Stack = createStackNavigator()

const NutritionTabScreen = props => {

    const handleOpenDrawer = () => props.navigation.openDrawer()

    return (
        <Stack.Navigator initialRouteName='Nutrition' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Nutrition' component={MainNutrtionScreen}/>
        </Stack.Navigator>
    )

    return (
        <>
            <Header
            placement="center"
            backgroundColor={colors.peach}
            leftComponent={{icon: 'menu', color: '#fff', onPress: handleOpenDrawer}}
            centerComponent={{ text: props.route.name, style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <SplashScreenContainer>
                <Stack.Navigator initialRouteName='Nutrition'>
                    <Stack.Screen name='Nutrition' component={MainNutrtionScreen}/>
                </Stack.Navigator>
            </SplashScreenContainer>
        </>
    )
}

export default NutritionTabScreen