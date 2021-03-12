import React from 'react'
import { KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../colors'


const SplashScreenContainer = ({children, style, statusBar}) => {

    return (
        <>
        { statusBar && <StatusBar backgroundColor={colors.sonicsilver}/> }
        <LinearGradient 
            style={{...styles.container, ...style}} 
            colors={[colors.platinum, colors.platinum]} 
            /* start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} */>

                    {children}
        </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        /* justifyContent: 'center', */
    },
})

export default SplashScreenContainer