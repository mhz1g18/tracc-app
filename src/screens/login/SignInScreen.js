import React from 'react'
import {useState} from 'react'
import {View, Text, ActivityIndicator, StyleSheet, Dimensions, TextInput, Linking, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../context/AuthContext'


const SignInScreen = ({navigation}) => {


    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidLogin: true
    })

    const [isLoading, setIsLoading] = useState(false)

    const textInputChange = (val) => {
        if(val.length != 0)
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            })
        else
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            })
    }

    const handlePasswordChange = (val) => {
        if(val.length != 0)
            setData({
                ...data,
                password: val,
            })
        else
            setData({
                ...data,
                password: val,
            })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry 
        })
    }

    const handleLogin = async () => {
        const { email, password } = data
        const path = 'http://192.168.43.218:8080/api/auth/signin'
        console.log(data);
        console.log(email);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }


        try {
            let response = await fetch(path, options)
            response = await response.json()

            console.log(response);
        } catch (err) {
            console.log(err);
            return err
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View 
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        size={20}
                    />
                    <TextInput
                        placeholder='Your email'
                        style={styles.textInput}
                        onChangeText={(val) => textInputChange(val)}
                        />
                    
                        {
                            data.email.length > 6 && 
                            <Animatable.View
                            animation='bounceIn'>
                                <AntDesign name="checkcircleo" size={18} color="green" /> 
                            </Animatable.View>
                        }
                </View>
                
             {/*    <View style={{ position: 'absolute',
                left: 0,
                right: 0,
                top: -50,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'}}>
                    <ActivityIndicator size='small' color='purple'/>
                </View> */}
                

                <Text style={styles.text_footer, {marginTop: 20}}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder='Your password'
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handlePasswordChange(val)}
                        />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        <Feather name="eye-off" size={20} color="grey" /> 
                    </TouchableOpacity>
                </View>
                    {/* (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Wrong username or password</Text>
                        </Animatable.View>
                    ) */}
                
                <TouchableOpacity onPress={() => handleForgottenPass()}>
                        <Text style={{marginTop: 5, marginLeft: 0, fontSize: 12}}>Forgotten Password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signUp} onPress={handleLogin}>
                        <LinearGradient
                            colors={['#A13D63', '#520353']}
                            style={styles.signIn}>
                                <Text style={styles.signIn, {color: '#fff', fontWeight: 'bold'}}>Log In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUp}
                        onPress={() => navigation.navigate('SignUpScreen')}>
                        <LinearGradient
                            colors={['#A13D63', '#520353']}
                            style={styles.signIn}>
                                <Text style={styles.signIn, {color: '#fff'}}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen

const {height} = Dimensions.get('screen')
const height_logo = height * 0.3
const device_width = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#A13D63'
    },
    signUp: {
        marginTop: 20,
        width: device_width * .88
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
       //marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginTop: 0,
        marginLeft: 10,
        height: 45,
        paddingLeft: 10,
        color: '#05375a',
        backgroundColor: 'white',
        width: device_width
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });