import React, { useReducer } from 'react'
import {View, Text, Image,  StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'


const initialState = {
    email: '',
    phone: '',
    name: '',
    emailChange: false,
    nameChange: false,
    phoneChange: false,
}

function reducer(state, action) {
    if(action.type == 'emailChange'){
        if(action.val.length > 0)
            return {...state, email: action.val, emailChange: true}
        else 
            return {...state, email: action.val, emailChange: false}
    } else if(action.type == 'nameChange'){
        if(action.val.length > 0)
            return {...state, name: action.val, nameChange: true}
        else 
            return {...state, name: action.val, nameChange: false}
    } else if(action.type == 'phoneChange') {
        if(action.val.length > 0)
            return {...state, phone: action.val, phoneChange: true}
        else 
            return {...state, phone: action.val, phoneChange: false}
    }
}

const SignUpScreen = ({navigation}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign Up</Text>
            </View>
            <Animatable.View 
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Name</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        size={20}
                    />
                    <TextInput
                        placeholder='Your firstname and lastname'
                        style={styles.textInput}
                        onChangeText={(val) => dispatch({type: 'nameChange', val: val})}/>
                    {state.nameChange ? 
                        <Animatable.View
                            animation='bounceIn'>
                            <AntDesign name="checkcircleo" size={18} color="green" /> 
                        </Animatable.View>
                        : null}
                </View>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="black" />
                    <TextInput
                        placeholder='Your email'
                        style={styles.textInput}
                        onChangeText={(val) => dispatch({type: 'emailChange', val: val})}/>
                    {state.emailChange ? 
                        <Animatable.View
                            animation='bounceIn'>
                            <AntDesign name="checkcircleo" size={18} color="green" /> 
                        </Animatable.View>
                        : null}
                </View>
                <Text style={styles.text_footer}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} />
                    <TextInput
                        placeholder='Your password'
                        style={styles.textInput}
                        onChangeText={(val) => dispatch({type: 'phoneChange', val: val})}/>
                    {state.phoneChange ? 
                        <Animatable.View
                            animation='bounceIn'>
                            <AntDesign name="checkcircleo" size={18} color="green" /> 
                        </Animatable.View>
                        : null}
                </View>
                <View style={styles.button}>
                    <LinearGradient
                        colors={['#A13D63', '#520353']}
                        style={styles.signIn}>
                            <Text style={styles.signIn, {color: '#fff', fontWeight: 'bold'}}>Sign Up</Text>
                    </LinearGradient>
                    <TouchableOpacity style={styles.signUp}
                    onPress={() => navigation.navigate('SignInScreen')}
                    >   
                        <View style={{justifyContent: 'center', alignItems:'center'}}>
                            <Text>Have an account? Sign in!</Text>
                        </View>
                </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignUpScreen

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
        marginTop: 50
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