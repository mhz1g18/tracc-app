import React, {useEffect, useState} from 'react'
import {  Text } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import { colors } from '../../../../../colors'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { units } from '../../../../../utils/units'
 
const SupplementForm = ({setForm, form}) => {

    const nameInputHandler = text => {
        setForm(form => ({...form, name: text}))
    }

    const unitInputHandler = item => {
        setForm(form => ({...form, unit: item.value}))
    }


    return (
        <View style={{justifyContent: 'center', borderWidth: 0, alignItems: 'center', marginTop: 15, width: '100%', }}>
            <Input placeholder='Supplement name' inputStyle={styles.inputStyle} containerStyle={{width: '90%', }} value={form?.name} onChangeText={nameInputHandler}
                        inputContainerStyle={styles.inputContainerStyle}  />
            <Text style={{alignSelf: 'flex-start', paddingLeft: 20,}}>Measurement Unit</Text>
            <DropDownPicker items={units}
                            defaultValue={form?.unit || 'UNIT_MG'}
                            containerStyle={{height: 35}}
                            style={{backgroundColor: '#fafafa', width:'88%', borderBottomWidth: StyleSheet.hairlineWidth}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            placeholder='Measurement Unit'
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={unitInputHandler}
/>

        </View>
    )
}

export default SupplementForm


const styles = StyleSheet.create({
    inputStyle: {
        fontSize:14, 
        paddingLeft: 10, 
        height: 15, 
        borderBottomWidth: 0
    },
    inputContainerStyle: {
        height: 30,
        borderColor: 'black', 
        marginLeft: -7,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 0, 
        marginBottom: -12,
        alignSelf: 'center'
    },
})