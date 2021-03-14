import React, { useContext, useEffect, useState, } from 'react'
import { TouchableOpacity } from 'react-native'
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
    const [quantity, setQuantity] = useState(item.quantity || 100)

    const toggleExpansion = () => {
        setCollaped(exp => !exp)
    }

    const onInputHandler = input => {
        setQuantity(parseInt(input))
    }

    useEffect(() => {
        item.quantity = quantity


    }, [quantity])

    return (
        <TouchableOpacity style={{flex: 1, }} onPress={toggleExpansion}>
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white',}}>
                <View style={{backgroundColor: colors.platinum, flexDirection: 'column', flex: 3}}>
                    <ListItem  bottomDivider>
                                {
                                    item.type === 'SUPPLEMENT' 
                                    ?
                                    <Avatar icon={{name:'pill', color:'#9c246a', type:'material-community', size:22}} rounded/>
                                    :
                                    <Avatar icon={{name:'food-steak', color:'#9c246a', type:'material-community', size: 30}} rounded/>
                                }
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    {item.categories.length > 0 && <ListItem.Subtitle>{item.categories.map((cat, idx) => `${cat} `)}</ListItem.Subtitle>}
                                    <Collapsible collapsed={collaped}>
                                    
                                        <View style={{marginTop: 5}}>
                                            {
                                                item.type === 'FOOD'
                                                ?
                                                <React.Fragment>
                                                <ListItem.Title>{item.calories * quantity / 100} calories</ListItem.Title>
                                                <ListItem.Subtitle>{item.carbs * quantity / 100} carbs {item.protein* quantity / 100} protein {item.fats* quantity / 100} fat</ListItem.Subtitle>
                                                <View style={{marginTop: 1}}>
                                                {
                                                    item.micronutrients?.map(macro => {
                                                            return (
                                                                <ListItem.Subtitle key={`macro-${macro?.id}`}>{`${macro.name} - ${macro?.quantity}${macro.unit.substring(5)/*.tolwerCase() */}`}</ListItem.Subtitle>
                                                            )
                                                        
                                                    })
                                                }
                                                </View>
                                                </React.Fragment>
                                                :
                                                null
                                            }
                                            {item.description && <ListItem.Subtitle>{item.description}</ListItem.Subtitle>}
                                            </View>
                                    </Collapsible>
                                </ListItem.Content>
                                {
                  
                        <TouchableOpacity style={{flex: 1}}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                                <Input keyboardType='numeric' value={quantity.toString() || 0} onChangeText={onInputHandler} inputContainerStyle={{height: 15, }}  containerStyle={{  height: 15,  width: 65}} />
                                <Text style={{paddingRight: 5}}>{item?.unit.substring(5)}</Text>
                                {
                                    searchResult ?
                                    <Icon onPress={() => onIconPress(item)} name='pluscircleo' type='antdesign' color='green' size={24} />
                                    :
                                    <Icon onPress={() => onIconPress(item)} name='minuscircleo' type='antdesign' color='red' size={24} />
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIconPress: ownProps.searchResult ?
                     item => dispatch(addEntry(item))
                     : 
                     item => dispatch(removeEntry(item))
    }
}

export default connect(null, mapDispatchToProps)(NutritionEntryCard)