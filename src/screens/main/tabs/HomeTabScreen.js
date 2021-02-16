import React from 'react'
import { Text } from 'react-native'
import SplashScreenContainer from '../../../components/SplashScreenContainer'
import {Header} from 'react-native-elements'
import { colors } from '../../../colors'

const HomeTabScreen = props => {

    const handleOpenDrawer = () => props.navigation.openDrawer()

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
                <Text> home tab screen</Text>
            </SplashScreenContainer>

        </>
    )
}

export default HomeTabScreen