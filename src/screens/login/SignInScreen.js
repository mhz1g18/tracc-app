import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, Dimensions, StyleSheet } from 'react-native'
import SplashScreenContainer from '../../components/SplashScreenContainer'
import SplashScreenHeader from '../../components/SplashScreenHeader'
import { Input, Button, SocialIcon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { loginUser, loginUserError } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign';
import Divider from 'react-native-divider'
import { colors } from '../../colors'

const SignInScreen = ({navigation, user, loading, setError, error, loginUser}) => {

    const [authObject, setAuthObject] = useState({
        username: '',
        usernameChange: false,
        password: '',
        passwordChange: false
    })


    const handleUsernameChange = text => {
        setAuthObject(authObj => ({
            ...authObj,
            username: text,
            usernameChange: text.length > 6 ? true : false
        }))
    }

    const handlePasswordChange = text => {
        setAuthObject(authObj => ({
            ...authObj,
            password: text,
            passwordChange: text.length > 6 ? true : false
        }))
    }

    const handleSignIn = () => {
        const {username, password} = authObject

        if(username.length < 6 || password.length < 8) {
            setError('Please type in your username and password')
        } else {
            loginUser({username, password})
        }


    }

    return (
        <SplashScreenContainer>
            <SafeAreaView style={{flex: 1, alignItems: 'center', paddingTop: 0}}>
                <SplashScreenHeader />
            </SafeAreaView>
            <KeyboardAvoidingView style={{flex: 1, alignItems: 'center',}}>
                <Input placeholder="Username"
                        leftIcon={
                            <Icon name='user'
                                  style={{paddingLeft: 10, padding: 0}}
                                  size={19}
                                  color='black' />
                        }
                        onChangeText={handleUsernameChange}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}/>
                <Input placeholder="Password"
                        leftIcon={
                            <Icon name='lock'
                                  style={{paddingLeft: 10, padding: 0}}
                                  size={19}
                                  color='black' />
                        }
                        onChangeText={handlePasswordChange}
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}/>
                <Button title="SIGN IN" 
                        type='outline'
                        loading={loading}
                        onPress={handleSignIn}
                        titleStyle={{ ...styles.buttonTitleStyle}}
                        buttonStyle={styles.signInButton}/>
                {
                    error === '' 
                    ?
                    null
                    : 
                    <Animatable.View animation="bounceIn" duration={500}>
                        <Text style={styles.errorMessage}>{error}</Text>
                    </Animatable.View>
                }
                <View style={{width: device_width * 0.8}}>
                    <Divider borderColor="white" color='white' orientation='center'>OR</Divider>
                    <SocialIcon title='Sign in With Facebook' button type='facebook' />
                </View>
            </KeyboardAvoidingView>

        </SplashScreenContainer>
    )

}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.32;
const device_width = Dimensions.get('window').width;


const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: 'white', 
        width: device_width * 0.8, 
        height: 40,
        borderRadius: 40, 
        borderColor: colors.smokyblack,
     /*    width: 450, */
    },
    buttonTitleStyle: {
        color: colors.riflegreen, 
        /* fontSize: 15, 
        fontWeight: '900' */
    },
    inputStyle: {
        fontSize:14, 
        paddingLeft: 10, 
        height: 15, 
        borderBottomWidth: 0
    },
    inputContainerStyle: {
        borderColor: '#ff9963', 
       /*  borderWidth: 1, */
       borderBottomWidth: 0,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 25, 
        marginBottom: -12,
        width: device_width * 0.8,
        alignSelf: 'center'
    },
    errorMessage: {
        color: 'white'
    },
})

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: request => dispatch(loginUser(request)),
        setError: error => dispatch(loginUserError(error)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)

