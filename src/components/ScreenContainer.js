import React from 'react'
import { ScrollView, View, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { colors } from '../colors'
import SplashScreenContainer from './SplashScreenContainer'

const ScreenContainer = ({children, title, refreshControl, rightIcon, leftComponent, rightComponent, style, headerBackgroundColor, ...props}) => {

    const handleOpenDrawer = () => props.navigation.openDrawer()

    return (
        <View refreshControl={refreshControl}  showsVerticalScrollIndicator={false} style={{height: Dimensions.get('window').height, }}>
        <Header
            placement="center"
            containerStyle={{borderBottomWidth: 0, }}
            backgroundColor={headerBackgroundColor || '#822a78'}
            leftComponent={leftComponent || {icon: 'menu', color: '#fff', onPress: handleOpenDrawer}}
            centerComponent={{ text: title || props.route.name, style: styles.titleText }}
            rightComponent={rightComponent || rightIcon}
            />
            <SplashScreenContainer style={{...style, ...styles.splashScreenContainer}}>
                {children}
            </SplashScreenContainer>
        </View>
    )
}

const screen_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    splashScreenContainer: {
        height: screen_height, 
        backgroundColor: '#ebebeb'
    },
    titleText: { 
        fontSize: 18, 
        color: '#fff' 
    }
})

export default ScreenContainer