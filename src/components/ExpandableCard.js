import React, { useContext, useState, } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, ListItem, Icon, Badge } from 'react-native-elements';
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { colors } from '../colors'
import { TabContext } from '../screens/main/tabs/nutrition/TabContext';
import { useNavigation } from '@react-navigation/core';

const ExpandableCard = ({item, onDelete}) => {

    const [collaped, setCollaped] = useState(true)
    const navigation = useNavigation()
    const userId = useSelector(state => state.auth.user.id)

    const { deleteItemHandler } = useContext(TabContext)
    
    const onDeleteHandler = () => {
        console.log(item.id)
        onDelete(item.id)
        deleteItemHandler(item.id)
    }

    const onEditHandler = () => {
        navigation.navigate('NutritionForm',{ type: item.type, item, edit: true,})
    }

    const toggleExpansion = () => {
        setCollaped(exp => !exp)
    }

    return (
        <TouchableOpacity style={{flex: 1, }} onPress={toggleExpansion}>
            <View style={{flexDirection: 'row', flex: 1,backgroundColor: 'white',}}>
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
                                    
                                        <View style={{marginTop: 5, }}>
                                            {
                                                item.type === 'FOOD'
                                                ?
                                                <>
                                                <ListItem.Title>{item.calories} calories</ListItem.Title>
                                                <ListItem.Subtitle>{item.carbs} carbs {item.protein} protein {item.fats} fat</ListItem.Subtitle>
                                                <View >
                                                {
                                                    item.micronutrients?.map(macro => {
                                                            return (
                                                                <React.Fragment key={`macro-${macro?.id}`}>
                                                                <ListItem.Subtitle >{`${macro.name} - ${macro?.quantity}${macro.unit.substring(5)/*.tolwerCase() */}`}</ListItem.Subtitle>
                                                                </React.Fragment>
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
                    </ListItem>
                </View>
                {
                    !collaped && item?.createdBy === userId
                    &&
                    <Animatable.View animation='bounceInRight' duration={1500} delay={0} style={{flexDirection: 'column',  flex: 1,}}>
                        <TouchableOpacity style={{flex: 1}} onPress={onDeleteHandler}>
                            <View style={{flexDirection: 'row', flex: 1,backgroundColor: '#b0213c', justifyContent: 'center', alignItems: 'center',  }}>
                                <Icon name='trash-2' type='feather' color='black' size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={onEditHandler}>
                            <View style={{flexDirection: 'row', flex: 1,backgroundColor: '#70afe6', justifyContent: 'center', alignItems: 'center',  }}>
                                <Icon name='edit' type='feather' color='black' size={24} />
                            </View>
                        </TouchableOpacity>
                     {/*    <TouchableOpacity style={{flex: 1}}>
                            <View style={{flexDirection: 'row', flex: 1,backgroundColor: colors.smokyblack, justifyContent: 'center', alignItems: 'center',  }}>
                                <Icon name='heart' type='feather' color='white' size={24} />
                            </View>
                        </TouchableOpacity> */}
                        
                    </Animatable.View>
                }
            </View>
           
        </TouchableOpacity>
    )
}

export default ExpandableCard