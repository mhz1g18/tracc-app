import React, {useEffect, useState} from 'react'
import {  Text } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import { colors } from '../../../../../colors'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { units } from '../../../../../utils/units'
 
const FoodForm = ({setForm, form}) => {

    const nameInputHandler = (text, field) => {
        setForm(form => ({...form, [field]: text}))
    }

    const unitInputHandler = item => {
        setForm(form => ({...form, unit: item.value}))
    }


    return (
        <View style={{paddingLeft: 15, paddingRight: 15, paddingTop: 15, justifyContent: 'center', alignItems: 'center',}}>
            <Input placeholder='Food name' inputStyle={styles.inputStyle}  value={form?.name} onChangeText={text => nameInputHandler(text, 'name')}
                        inputContainerStyle={styles.inputContainerStyle}  />
            <View style={{flexDirection: 'row', width: '100%', marginLeft: 15, marginRight: 15, }}>
                <View style={{flexDirection: 'column', flex: 1}}>
                        <Input placeholder='Calories' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.calories?.toString()} onChangeText={text => nameInputHandler(text, 'calories')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                        <Input placeholder='Quantity' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.quantity?.toString()} onChangeText={text => nameInputHandler(text, 'quantity')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={{flexDirection: 'column', flex: 2 }}>
              {/*       <Text style={{alignSelf: 'flex-start', paddingLeft: 20,}}>Measurement Unit</Text> */}
                    <DropDownPicker items={units}
                                    defaultValue={form?.unit || 'UNIT_G'}
                                    containerStyle={{height: 35, paddingLeft: 15}}
                                    style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    placeholder='Measurement Unit'
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={unitInputHandler}/>
                </View>
            </View>
            <View style={{flexDirection: 'row', width: '100%', marginLeft: 15, marginRight: 15, }}>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <Input placeholder='Protein' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.protein?.toString()} onChangeText={text => nameInputHandler(text, 'protein')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <Input placeholder='Fats' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.fats?.toString()} onChangeText={text => nameInputHandler(text, 'fats')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                    <Input placeholder='Carbs' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.carbs?.toString()} onChangeText={text => nameInputHandler(text, 'carbs')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
            </View>
                        

        </View>
    )
}

export default FoodForm


const styles = StyleSheet.create({
    inputStyle: {
        fontSize:14, 
        height: 15, 
    },
    inputContainerStyle: {
        height: 30,
        borderColor: 'black', 
        marginLeft: -7,
        backgroundColor: 'white', 
        opacity: 0.6, 
        marginBottom: -12,
        alignSelf: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})