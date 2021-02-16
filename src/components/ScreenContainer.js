import React from 'react'
import { Header } from 'react-native-elements'
import { colors } from '../colors';
import SplashScreenContainer from './SplashScreenContainer'

const ScreenContainer = ({children, ...props}) => {
console.log('rendering screen container');

    const handleOpenDrawer = () => console.log('haha')

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
                {children}
            </SplashScreenContainer>
        </>
    )
}

export default ScreenContainer