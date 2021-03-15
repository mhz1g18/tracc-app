import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { connect, } from 'react-redux'
import SplashScreenContainer from '../../../components/SplashScreenContainer'
import { logoutUser } from '../../../redux/actions/authActions'
import { colors } from '../../../colors'
import { ListItem, Icon, Avatar } from 'react-native-elements'


const list = [
    {
        title: 'Steps',
        icon: 'shoe-prints',
        icontype: 'font-awesome-5',
        onPress: (navigation) => navigation.navigate('hahaha')
    },
    {
        title: 'Statistics',
        icon: 'bar-graph',
        icontype: 'entypo',
        onPress: (navigation) => navigation.navigate('hahaha')
    },
    {
        title: 'Goals',
        icon: 'target',
        icontype: 'simple-line-icon',
        onPress: (navigation) => navigation.navigate('hahaha')
    },
    {
        title: 'Profile',
        icon: 'user',
        icontype: 'antdesign',
        onPress: (navigation) => navigation.navigate('hahaha')
    }
]   
const DrawerContent = ({user, logoutUser, ...props}) => {

    const pressHandler = (item) => {
        const func = item.onPress
        func(props.navigation)
    }

    const logoutHandler = () => {
        logoutUser()
    }

    return (
        <SplashScreenContainer>
            <View style={{flex: 1, paddingTop: 100}}>
                <DrawerContentScrollView style={{width: '100%',}} {...props}>
                    <View style={{flex: 2, /* justifyContent: 'center', alignSelf: 'center',  */ }}>
                        <View style={{flexDirection: 'row',  }}>
                            <Avatar source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/koala-bear-lazy-honey-wild-animal-33903.png'}}
                                    size={90} />
                            <Text style={{color: colors.smokyblack, paddingBottom: 5, paddingLeft: 10, fontSize: 42, fontWeight: 'bold', fontFamily: 'sans-serif-thin'}}>trakk.</Text>
                        </View>
                        
                        {list.map((item, idx) => {
                                return (
                                   /*  <View style={{flexDirection: 'row', width: '100%', }}>
                                        <DrawerItem label={item.title} key={idx}
                                        style={{width: StyleSheet.absoluteFill.width}}
                                                labelStyle={{marginLeft: -20, color: colors.smokyblack}}
                                                icon={({focused, color, size}) => <Icon  name={item.icon} type={item.icontype} style={{paddingLeft: 20}} color={color} size={size} />}
                                                inactiveBackgroundColor={colors.platinum}
                                                activeBackgroundColor={colors.platinum}/>
                                    </View> */
                                    <ListItem bottomDivider key={idx}>
                                        <Icon name={item.icon} type={item.icontype} color='black' size={24}/>
                                        <ListItem.Content>
                                            <Text>{item.title}</Text>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            })}
                            <ListItem bottomDivider onPress={logoutHandler}>
                                <Icon name='md-exit' type='ionicon' color='black' size={24}/>
                                <ListItem.Content>
                                    <Text>Logout</Text>
                                </ListItem.Content>
                            </ListItem>
                    </View>
                </DrawerContentScrollView>
              {/*   <View>
                            <DrawerItem label='Logout' 
                                        onPress={logoutHandler}
                                        labelStyle={{marginLeft: -20, marginBottom: 2,}}
                                        icon={({focused, color, size}) => <Icon name='md-exit' color={color} size={size} type='ionicon' />}
                                        inactiveBackgroundColor='transparent' />
                </View>
               */}  
            </View>
        </SplashScreenContainer>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)