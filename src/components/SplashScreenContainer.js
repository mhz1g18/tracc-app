import React from 'react'
import { View } from 'react-native'
import { KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../colors'


const SplashScreenContainer = ({children, style, statusBar}) => {

    return (
        <>
        { statusBar && <StatusBar backgroundColor='#51c4c9'/> }
        <View 
            style={{...styles.container, ...style}} 
            colors={[colors.platinum, colors.platinum]} 
            /* start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} */>

                    {children}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.backgroundGreen,
        /* justifyContent: 'center', */
    },
})

export default SplashScreenContainer