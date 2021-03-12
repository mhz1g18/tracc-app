import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, View, Dimensions, StyleSheet } from 'react-native'
import SplashScreenContainer from '../../components/SplashScreenContainer'
import { Input, Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {colors} from '../../colors'
import DatePicker from 'react-native-date-picker'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const SignUpInfoScreen = ({navigation,}) => {

    const [userInfo, setUserInfo] = useState({
        name: '',
        nameChange: false,
        dateOfBirth: new Date(),
        dateOfBirthChange: false,
        weight: 0,
        weightChange: false,
        height: 0,
        heightChange: false,
    })

    const [showDatePicker, setShowDatePicker] = useState(false)

    const nameChangeHandler = text => {
        console.log(text);
        setUserInfo(info => ({...info, name: text, nameChange: text.length > 5 ? true: false}))
    }

    const weightChangeHandler = text => {
        setUserInfo(info => ({...info, weight: text, weightChange: true}))
    }

    const heightChangeHandler = text => {
        setUserInfo(info => ({...info, height: text, heightChange: true}))
    }

    const dobChangeHandler = date => {
        setUserInfo(info => ({...info, dateOfBirth: date, dateOfBirthChange: true}))
    }

    const showDatePickerHandler = () => {
        setShowDatePicker(value => !value)
    }


    const nextScreenHandler = () => {
        console.log(userInfo);
        let {name, dateOfBirth, weight, height} = userInfo
        dateOfBirth = dateOfBirth.toISOString()
        navigation.navigate('SignUpLoginScreen', {
            name,
            dateOfBirth,
            weight,
            height,
        })
    }




    return (
        <SplashScreenContainer>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTextStyle}> Tell us more about yourself </Text>
                </View>
                <KeyboardAvoidingView style={styles.footer}>
                    <Input placeholder="First and last name"
                            leftIcon={<Icon name='user'
                                    style={styles.iconStyle}
                                    size={19}
                                    color='black' />
                            }
                            onChangeText={nameChangeHandler}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}/>
                    <Input placeholder="Your birthday" 
                            value={userInfo.dateOfBirthChange ? userInfo.dateOfBirth.toDateString() : null} 
                            onFocus={showDatePickerHandler} onBlur={showDatePickerHandler}
                            leftIcon={<FontistoIcon name='date'
                                    style={styles.iconStyle}
                                    size={19}
                                    color='black' />
                            }
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}/>
                    {
                    showDatePicker && 
                    <DatePicker date={userInfo.dateOfBirth} mode='date'
                                onDateChange={dobChangeHandler}/>
                    }
                <Input placeholder="Weight"
                        leftIcon={<FontAwesome5Icon name='weight'
                                  style={styles.iconStyle}
                                  size={19}
                                  color='black' />
                        }
                        onChangeText={weightChangeHandler}
                        keyboardType='numeric'
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}/>
                <Input placeholder="Height"
                        leftIcon={<MaterialCommunityIcon name='human-male-height'
                                  style={styles.iconStyle}
                                  size={19}
                                  color='black' />
                        }
                        onChangeText={heightChangeHandler}
                        keyboardType='numeric'
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}/>
                <Button title="CONTINUE" 
                        type='outline'
                        onPress={nextScreenHandler}
                        titleStyle={{ ...styles.buttonTitleStyle}}
                        buttonStyle={styles.signInButton}/>
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
    },
    signInButton: {
        backgroundColor: 'white', 
        width: device_width * 0.8, 
        height: 40,
        borderRadius: 40, 
        borderColor: 'black',
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
    },
    iconStyle: {
        paddingLeft: 10,
        padding: 0,
    },
    headerTextStyle: {
        color: colors.smokyblack,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-thin',
    }
})


export default SignUpInfoScreen

