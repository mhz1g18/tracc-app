import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import { colors } from '../../colors'
import { Button, Text, } from 'react-native-elements'
import { fetchUser } from '../../redux/actions/authActions'
import GradientButton from '../../components/GradientButton'
import SplashScreenContainer from '../../components/SplashScreenContainer'
import SplashScreenHeader from '../../components/SplashScreenHeader'
import { connect } from 'react-redux'

const SplashScreen = ({navigation, fetchUser, user, loading, error}) => {

    const getStartedHandler = () => {
        navigation.navigate('SignUpInfoScreen')
    }

    const signInHandler = () => {
        navigation.navigate('SignInScreen')
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <SplashScreenContainer>
            {
                !loading ?
                <>
                    <Animatable.View animation='bounceIn' duration={2000} style={styles.header}>

                    <SplashScreenHeader />
                    </Animatable.View>

                    <View style={styles.footer}>
                    <Button title="GET STARTED" 
                            type='outline' 
                            onPress={getStartedHandler}
                            titleStyle={styles.buttonTitleStyle}
                            buttonStyle={styles.buttonStyle}/>
                    <View style={{marginTop: 10,}}></View>
                    <Button title="SIGN IN" 
                            type='outline' 
                            onPress={signInHandler}
                            titleStyle={{...styles.buttonTitleStyle, color: 'black'}}
                            buttonStyle={styles.buttonStyle}/>
                    </View>
                </> 
                :
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color={colors.blue}/>
                </View>
            }
        </SplashScreenContainer>
    )
    
   

}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: ()  => dispatch(fetchUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)


const {height} = Dimensions.get("screen");
const height_logo = height * 0.32;
const device_width = Dimensions.get('window').width;

console.log(device_width);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        /* justifyContent: 'center', */
    },
    header: {
        marginTop: '10%',
        alignItems:'center', 
        flex: 1,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
    },
    buttonTitleStyle: {
        color: colors.blue, 
        fontSize: 15, 
        fontWeight: '900'
    },
    buttonStyle: {
        backgroundColor: 'white', 
        width: device_width * 0.8, 
        height: 45, 
        borderRadius: 25, 
    },
    caption: {
        color: '#919191',
        fontSize: 20,
        fontFamily: 'sans-serif-thin'
    },
    title: {
        color: colors.blue,
        fontSize: 50
    },
    header: {
        marginTop: '10%',
        alignItems:'center', 
        flex: 2,
    },
});
