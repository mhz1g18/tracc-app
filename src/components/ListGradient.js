import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ListGradient = props => {
    return (
        <View style={styles.wrapper}>
            <LinearGradient locations={LOCATIONS} colors={GRADIENT_COLORS} style={styles.linearGradient}>

            </LinearGradient>
        </View>
    )
}

export default ListGradient

const GRADIENT_COLORS = ['#FFFFFF', '#FFFFFF', '#FFFFFF00']
const LOCATIONS = [0, 1, 1]

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        flex: 1,
    },  
    linearGradient: {
        flex: 1,
        width: '100%',
        borderRadius: 5
    }
});