import React from 'react'
import { ScrollView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { colors } from '../../../../../colors'

const FoodForm = ({item}) => {

    return (
        <ScrollView style={{flex: 1, borderWidth: 1 }} contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}>
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Name' />
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Calories' />
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Protein' />
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Carbohydrates' />
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Fiber' />
            <Input  inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle}label='Fats' />
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '80%'}}
                        inputContainerStyle={styles.inputContainerStyle} label='Trans Fats' />
        </ScrollView>
    )
}

export default FoodForm


const styles = StyleSheet.create({
    inputStyle: {
        fontSize:14, 
        paddingLeft: 10, 
        height: 15, 
        borderBottomWidth: 0
    },
    inputContainerStyle: {
        borderColor: 'grey', 
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 15, 
        marginBottom: -12,
        alignSelf: 'center'
    },
})