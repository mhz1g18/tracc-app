import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {
    Text,
    Button
} from 'react-native'

const HomeScreen = () => {

    const removeUser = () => {
        try {
            console.log('removing user');
            AsyncStorage.removeItem('traccUser')
        } catch(e) {
            console.log(e);
        } finally {
            console.log('removed user');
        }
    }

    return (
        <>
            <Text> Home Screen</Text>
            <Button title="press me" onPress={removeUser}/>
        </>
    )
}

export default HomeScreen