import React, {useEffect, useState} from 'react'
import {  Text } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import { colors } from '../../../../../colors'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { units } from '../../../../../utils/units'
import { ScrollView } from 'react-native'
 
const FoodForm = ({setForm, form}) => {

    console.log(form)
    const nameInputHandler = (text, field) => {
        setForm(form => ({...form, [field]: text}))
    }

    const unitInputHandler = item => {
        setForm(form => ({...form, unit: item.value}))
    }


    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View style={{flexDirection: 'column', padding: 10, paddingTop: 20, borderBottomWidth: StyleSheet.hairlineWidth}}>
                <Text style={styles.label}>Item name</Text>
                 <Input placeholder='Food name' inputStyle={styles.inputStyle}  value={form?.name} onChangeText={text => nameInputHandler(text, 'name')}
                        inputContainerStyle={styles.inputContainerStyle}  />
            </View>
            <View style={styles.inputRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>Calories</Text>
                    <Input placeholder='Calories' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.calories?.toString()} onChangeText={text => nameInputHandler(text, 'calories')}
                            inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Quantity</Text>
                    <Input placeholder='Quantity' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.quantity?.toString()} onChangeText={text => nameInputHandler(text, 'quantity')}
                                    inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                
            </View>
            <View style={{width: 400, alignSelf: 'flex-start', padding: 10, paddingBottom: 20,  borderBottomWidth: StyleSheet.hairlineWidth}}>
                <Text style={{fontSize: 16, paddingBottom:6}}>Measurement Unit</Text>
                <DropDownPicker items={units}
                                defaultValue={form?.unit || 'UNIT_G'}
                                containerStyle={{height: 35,  width: 160}}
                                style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                                itemStyle={{
                                    paddingLeft: 15, 
                                    justifyContent: 'flex-start'
                                }}
                                placeholder='Measurement Unit'
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={unitInputHandler}/>
            </View>
            <View style={styles.inputRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>Protein</Text>
                    <Input placeholder='Protein' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.protein?.toString()} onChangeText={text => nameInputHandler(text, 'protein')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Fats</Text>
                    <Input placeholder='Fats' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.fats?.toString()} onChangeText={text => nameInputHandler(text, 'fats')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Carbs</Text>
                    <Input placeholder='Carbs' inputStyle={styles.inputStyle} keyboardType='numeric' value={form?.carbs?.toString()} onChangeText={text => nameInputHandler(text, 'carbs')}
                        inputContainerStyle={styles.inputContainerStyle}  />
                </View>
            </View>
        </ScrollView>
    )
}

export default FoodForm


const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
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
    column: {
        flexDirection: 'column', 
        flex: 1
    },
    inputRow: {
        flexDirection: 'row',
        padding: 10, 
        paddingTop: 20,  
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    label: {
        fontSize: 16,
        paddingLeft: 5
    }
})