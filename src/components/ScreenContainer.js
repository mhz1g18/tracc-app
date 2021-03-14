import React from 'react'
import { ScrollView, View, StatusBar, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { colors } from '../colors'
import SplashScreenContainer from './SplashScreenContainer'

const ScreenContainer = ({children, title, refreshControl, rightIcon, leftComponent, rightComponent, style, headerBackgroundColor, ...props}) => {

    const handleOpenDrawer = () => props.navigation.openDrawer()

    return (
        <View refreshControl={refreshControl}  showsVerticalScrollIndicator={false} style={{height: Dimensions.get('window').height, }}>
        <Header
            placement="center"
            containerStyle={{borderBottomWidth: 0,  borderBottomColor: colors.smokyblack}}
            backgroundColor={headerBackgroundColor || '#822a78'}
            leftComponent={leftComponent || {icon: 'menu', color: '#fff', onPress: handleOpenDrawer}}
            centerComponent={{ text: title || props.route.name, style: { fontSize: 18, color: '#fff' } }}
            rightComponent={rightComponent || rightIcon}
            />
            <SplashScreenContainer style={{...style, height: Dimensions.get('window').height, backgroundColor: 'white'}}>
                {children}
            </SplashScreenContainer>
        </View>
    )
}

export default ScreenContainer