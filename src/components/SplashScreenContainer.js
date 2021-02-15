import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../colors'


const SplashScreenContainer = ({children}) => {

    return (
        <LinearGradient 
            style={styles.container} 
            colors={[colors.lemon, colors.peach]} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>

                    {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        /* justifyContent: 'center', */
    },
})

export default SplashScreenContainer