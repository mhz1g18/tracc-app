import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, View, Dimensions, StyleSheet } from 'react-native'
import SplashScreenContainer from '../../components/SplashScreenContainer'
import { Input, Button, SocialIcon, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors'
import Divider from 'react-native-divider'
import { connect } from 'react-redux';
import { signUpUser } from '../../redux/actions/authActions'

const SignUpLoginScreen = ({navigation, route, loading, error, signUpUser,}) => {


    const [signUpRequest, setSignUpRequest] = useState({
        username: '',
        usernameChange: false,
        password: '',
        passwordChange: false,
        userInfo: route.params
    })

    console.log(error);


    const nameChangeHandler = text => {
        setSignUpRequest(request => ({...request, username: text, usernameChange: text.length > 5 ? true: false}))
    }

    const passwordChangeHandler = text => {
        setSignUpRequest(request => ({...request, password: text, passwordChange: text.length > 5 ? true: false}))
    }



    const signUpHandler = () => {
        const {username, password, userInfo} = signUpRequest
        signUpUser({username, password, userInfo})
    }




    return (
        <SplashScreenContainer>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTextStyle}>Now, choose your  sign-in method </Text>
                </View>
                <KeyboardAvoidingView style={styles.footer}>
                    <Input placeholder="Username"
                            leftIcon={<Icon name='user'
                                    style={styles.iconStyle}
                                    size={19}
                                    color='black' />
                            }
                            onChangeText={nameChangeHandler}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}/>
                    <Input placeholder="Password" 
                            secureTextEntry={true}
                            leftIcon={<Icon name='lock'
                                    style={styles.iconStyle}
                                    size={19}
                                    color='black' />
                            }
                            onChangeText={passwordChangeHandler}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}/>
                            
                <Button title="SIGN UP" 
                        type='outline'
                        loading={loading}
                        onPress={signUpHandler}
                        titleStyle={{ ...styles.buttonTitleStyle}}
                        buttonStyle={styles.signInButton}/>

                <View style={{width: device_width * 0.8}}>
                    <Divider borderColor="black" orientation='center'>OR</Divider>
                    <SocialIcon title='Sign in With Facebook' button type='facebook' />
                </View>
                            
            </KeyboardAvoidingView>
            </View>

        </SplashScreenContainer>
    )

}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.32;
const device_width = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        paddingTop: '20%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    header: {
        width: device_width * 0.8,
        justifyContent: 'flex-start',
    },
    footer: {
        paddingTop: 20, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButton: {
        backgroundColor: 'white', 
        width: device_width * 0.8, 
        height: 40,
        borderRadius: 40, 
        borderColor: 'black',
    },
    buttonTitleStyle: {
        color: colors.riflegreen, 
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
    },
    iconStyle: {
        paddingLeft: 10,
        padding: 0,
    },
    headerTextStyle: {
        color: colors.smokyblack,
        fontSize: 20    ,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-thin',
    }
})

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: request => dispatch(signUpUser(request))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoginScreen)

