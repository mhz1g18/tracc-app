import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const SplashScreen = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                    animation='bounceIn'
                    duration={1500}
                    source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/koala-bear-lazy-honey-wild-animal-33903.png'}}
                    style={styles.logo} resizeMode='stretch' />
                <Text style={{fontWeight: 'bold', color: 'white', fontSize:42}}>trakk<Text style={{color: '#006ba6'}}>.</Text></Text>
            </View>

            <Animatable.View style={styles.footer} duration={2000} animation='fadeInUpBig'>
                <Text style={styles.title}>Your healthy friend </Text>
                <Text style={styles.text}>Track your activities</Text>
                <TouchableOpacity style={styles.buttonsArea} onPress={() => navigation.navigate('SignInScreen')}>
                     <LinearGradient colors={['#A13D63', '#520353']} style={styles.signIn}> 
                        <Text style={styles.textSign}>Sign In</Text>
                        <Icon name='arrowright' style={{marginLeft: 6}} color={'white'} size={24}/> 
                    </LinearGradient> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonsArea} onPress={() => navigation.navigate('SignUpScreen')}>
                    <LinearGradient
                        colors={['#A13D63', '#520353']} style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                        <Icon name='arrowright' style={{marginLeft: 6}} color={'white'} size={24}/>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen


const {height} = Dimensions.get("screen");
const height_logo = height * 0.32;
const device_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#A13D63'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#006ba6',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      marginTop: 10,
      width: device_width - 50 ,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});