import React, { useContext, useEffect, useRef, useState, } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, ListItem, Icon, Badge, Input } from 'react-native-elements';
import { connect, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { colors } from '../colors'
import { TabContext } from '../screens/main/tabs/nutrition/TabContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { units } from '../utils/units';
import { addEntry, removeEntry } from '../redux/actions/nutritionEntryActions';

const NutritionEntryCard = ({item, searchResult, onIconPress}) => {

    const [collaped, setCollaped] = useState(true)
    const [calculatedItem, setCalculatedItem] = useState({...item, quantity: item.quantity || 100})
    
    const toggleExpansion = () => {
        setCollaped(exp => !exp)
    }

    const onInputHandler = input => {
       const newQuantity = parseInt(input)
       if(item.type === 'FOOD') {
        setCalculatedItem(prevItem => ({
            ...prevItem,
            quantity: newQuantity,
            calories: item.calories * newQuantity / (item.quantity || 100),
            carbs: item.carbs * newQuantity / (item.quantity || 100), 
            fats: item.fats * newQuantity / (item.quantity || 100), 
            fiber: item.fiber * newQuantity / (item.quantity || 100), 
            transfats: item.transfats * newQuantity / (item.quantity || 100), 
            sugars: item.sugars * newQuantity / (item.quantity || 100), 
            micronutrients: item.micronutrients.map((micro, idx) => ({...micro, quantity: micro.quantity * newQuantity / (item.quantity || 100)}))
        }))
       } else {
           setCalculatedItem(prevItem => ({...prevItem, quantity: newQuantity}))
       }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={toggleExpansion}>
            <View style={styles.innerWrapper}>
                <View style={styles.view}>
                    <ListItem  bottomDivider>
                                {
                                    item.type === 'SUPPLEMENT' 
                                    ?
                                    <Avatar icon={SUPPLEMENT_ICON} rounded/>
                                    :
                                    <Avatar icon={FOOD_ICON} rounded/>
                                }
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    {
                                    item.categories.length > 0 && 
                                    <ListItem.Subtitle>{item.categories.map((cat, idx) => `${cat} `)}</ListItem.Subtitle>
                                    }
                                    <Collapsible collapsed={collaped}>
                                    
                                        <View style={{marginTop: 5}}>
                                            {
                                                item.type === 'FOOD'
                                                ?
                                                <>
                                                <ListItem.Title>{calculatedItem.calories} calories</ListItem.Title>
                                                <ListItem.Subtitle>{calculatedItem.carbs} carbs {calculatedItem.protein} protein {calculatedItem.fats} fat</ListItem.Subtitle>
                                                <View style={{marginTop: 1}}>
                                                {
                                                    calculatedItem.micronutrients?.map(macro => {
                                                            return (
                                                                <ListItem.Subtitle key={`macro-${macro?.id}`}>{`${macro.name} - ${macro?.quantity}${macro.unit.substring(5)/*.tolwerCase() */}`}</ListItem.Subtitle>
                                                            )
                                                        
                                                    })
                                                }
                                                </View>
                                                </>
                                                :
                                                null
                                            }
                                            {item.description && <ListItem.Subtitle>{item.description}</ListItem.Subtitle>}
                                            </View>
                                    </Collapsible>
                                </ListItem.Content>
                                {
                  
                        <TouchableOpacity style={styles.container}>
                            <View style={styles.quantityInputWrapper}>
                                <Input disabled={!searchResult} 
                                       keyboardType='numeric' 
                                       value={calculatedItem.quantity.toString() || 0} 
                                       onChangeText={onInputHandler} 
                                       inputContainerStyle={{height: 15, }} 
                                        containerStyle={{  height: 15,  width: 65}} />
                                <Text style={{paddingRight: 5}}>{item?.unit.substring(5)}</Text>
                                {
                                    searchResult ?
                                    <Icon onPress={() => onIconPress(calculatedItem)} name='pluscircleo' type='antdesign' color='green' size={24} />
                                    :
                                    <Icon onPress={() => onIconPress(calculatedItem)} name='minuscircleo' type='antdesign' color='red' size={24} />
                                }
                            </View>
                        </TouchableOpacity>
                }
                    </ListItem>
                </View>
            </View>
           
        </TouchableOpacity>
    )
}

const SUPPLEMENT_ICON = {name:'pill', color:'#9c246a', type:'material-community', size:22}
const FOOD_ICON = {name:'food-steak', color:'#9c246a', type:'material-community', size: 30}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerWrapper: {
        flexDirection: 'row', 
        width: '100%', 
        backgroundColor: 'white',
    },
    view: {
        backgroundColor: colors.platinum, 
        flexDirection: 'column', 
        flex: 3
    },
    quantityInputWrapper: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',  
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIconPress: ownProps.searchResult ?
                     item => dispatch(addEntry(item))
                     : 
                     item => dispatch(removeEntry(item))
    }
}

export default connect(null, mapDispatchToProps)(NutritionEntryCard)