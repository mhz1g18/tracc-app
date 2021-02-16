import { DrawerContentScrollView } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import { connect, useSelector } from 'react-redux'
import SplashScreenContainer from '../../../components/SplashScreenContainer'

const DrawerContent = ({user, ...props}) => {

    return (
        <SplashScreenContainer>
            <View style={{alignSelf: 'flex-start'}}>
                <DrawerContentScrollView {...props}>
                    <Text>{user.username}</Text>
                </DrawerContentScrollView>
            </View>
        </SplashScreenContainer>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(DrawerContent)