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
        console.log(item.value);
        setForm(form => ({...form, unit: item.value}))
    }


    return (
        <View style={styles.wrapper}>
            <View style={{flexDirection: 'column', padding: 10, paddingTop: 20, borderBottomWidth: StyleSheet.hairlineWidth}}>
                <Text style={styles.label}>Item name</Text>
                 <Input placeholder='Food name' inputStyle={styles.inputStyle}  value={form?.name} onChangeText={nameInputHandler}
                        inputContainerStyle={styles.inputContainerStyle}  />
            </View>

                <Text style={{alignSelf: 'flex-start', fontSize: 16, paddingBottom:6}}>Measurement Unit</Text>
                <DropDownPicker items={units}
                            defaultValue={form?.unit || 'UNIT_MG'}
                            containerStyle={{height: 35}}
                            style={styles.pickerStyle}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            placeholder='Measurement Unit'
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={unitInputHandler}/>

        </View>
    )
}

export default SupplementForm


const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center', 
        borderWidth: 0, 
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 16,
        paddingLeft: 5
    },
    pickerStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#fafafa',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
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