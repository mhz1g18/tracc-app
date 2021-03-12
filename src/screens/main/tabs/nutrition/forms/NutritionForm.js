import React, {useState} from 'react'
import { ScrollView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { colors } from '../../../../../colors'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { units } from '../../../../../utils/units'
 
const NutritionForm = ({item}) => {
    return (
        <ScrollView style={{flex: 1, paddingTop: 20 }} contentContainerStyle={{alignItems: 'center', paddingBottom: 200}}>
            <Input inputStyle={styles.inputStyle} containerStyle={{width: '82%', }}
                        inputContainerStyle={styles.inputContainerStyle} placeholder='Name' />
            <DropDownPicker items={units}
                            containerStyle={{height: 50}}
                            style={{backgroundColor: '#fafafa', width:'80%'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            placeholder='Measurement Unit'
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => setCountry({country: item.value})}
/>
        </ScrollView>
    )
}

export default NutritionForm


const styles = StyleSheet.create({
    inputStyle: {
        fontSize:14, 
        paddingLeft: 10, 
        height: 15, 
        borderBottomWidth: 0
    },
    inputContainerStyle: {
        height: 50,
        borderColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: -7,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 0, 
        marginBottom: -12,
        alignSelf: 'center'
    },
})