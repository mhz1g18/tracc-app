import React, { useContext, useEffect, useState, } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, ListItem, Icon, Badge, Input } from 'react-native-elements';
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { colors } from '../colors'
import { TabContext } from '../screens/main/tabs/nutrition/TabContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { units } from '../utils/units';

const NutritionEntryCard = ({item, onAdd, onEdit, onRemove}) => {

    const [collaped, setCollaped] = useState(true)

    console.log('quantity in card is ' + item.quantity)

    const [quantity, setQuantity] = useState(item.quantity || 100)

    const { deleteItemHandler } = useContext(TabContext)

    const addToListHandler = () => {
        onAdd(item, item.unit, quantity)
    }

    const toggleExpansion = () => {
        setCollaped(exp => !exp)
    }

    const onInputHandler = input => {
        setQuantity(parseInt(input))
        if(onEdit) {
            //onEdit(item, item.quantity, quantity)
            //onEdit(item, item.unit, parseInt(input))
            console.log(onEdit);
        }
    }
/* 
    useEffect(() => {
        if(onEdit) {
            onEdit(item, item.quantity, quantity)
        }
    }, [quantity])
 */
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
                                                <ListItem.Title>{item.calories} calories</ListItem.Title>
                                                <ListItem.Subtitle>{item.carbs} carbs {item.protein} protein {item.fats} fat</ListItem.Subtitle>
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
                    </ListItem>
                </View>
                {
                    <View animation='bounceInRight' duration={1500} delay={0} 
                    style={{flexDirection: 'column', alignItems: 'center',  flex: 2,}}>
                        <TouchableOpacity style={{flex: 1}}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                                <Input keyboardType='numeric' value={quantity.toString()} onChangeText={onInputHandler} inputContainerStyle={{height: 21, }}  containerStyle={{  height: 30,  width: 65}} />
                                <Text style={{paddingRight: 5}}>{item?.unit.substring(5)}</Text>
                                {
                                    onAdd ?
                                    <Icon onPress={addToListHandler} name='pluscircleo' type='antdesign' color='green' size={24} />
                                    :
                                    <Icon onPress={onRemove} name='minuscircleo' type='antdesign' color='red' size={24} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
           
        </TouchableOpacity>
    )
}

export default NutritionEntryCard