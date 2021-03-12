import React from 'react'
import { StyleSheet, Image, Dimensions, } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { colors } from '../colors'
import { Text } from 'react-native-elements'

const SplashScreenHeader = ({}) => {

    return (
        <>
            <Image style={styles.logoImage} 
                    source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/koala-bear-lazy-honey-wild-animal-33903.png'}}
                    resizeMode='stretch'/>
            <Text h1 h1Style={styles.title}> TRAKK.</Text>
            <Text h4 h4Style={styles.caption}> your healthy friend</Text>
        </>
    )
}

export default SplashScreenHeader

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    caption: {
        color: '#362d14',
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
        fontWeight: '900'
    },
    title: {
        color: colors.riflegreen,
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-thin'
    },
    logoImage: {
        height: height * 0.31,
         width: height * 0.31, 
         marginBottom: -20
    },
    header: {
        marginTop: '10%',
        alignItems:'center', 
        flex: 2,
    },
})