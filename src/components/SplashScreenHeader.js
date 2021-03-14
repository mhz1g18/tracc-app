import React from 'react'
import { StyleSheet, Image, Dimensions, View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { colors } from '../colors'
import { Text } from 'react-native-elements'

const SplashScreenHeader = ({}) => {

    return (
        <View style={styles.wrapper}>
            <Image style={styles.logoImage} 
                    source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/koala-bear-lazy-honey-wild-animal-33903.png'}}
                    resizeMode='stretch'/>
            <Text h1 h1Style={styles.title}> TRAKK.</Text>
            <Text h4 h4Style={styles.caption}> your healthy friend</Text>
        </View>
    )
}

export default SplashScreenHeader

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    caption: {
        color: '#362d14',
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
        fontWeight: '900',
        color: 'white'
    },
    title: {
        color: 'white',
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