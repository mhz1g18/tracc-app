import React, { useContext, useRef, useState, } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Avatar, ListItem, Icon, Badge } from 'react-native-elements';
import { connect, useSelector } from 'react-redux'
import { colors } from '../colors'
import { TabContext } from '../screens/main/tabs/nutrition/TabContext';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { deleteNutritionAsync } from '../redux/actions/nutritionActions';

const ExpandableCard = ({item, deleteNutrition, cardEditable}) => {

    const [collaped, setCollaped] = useState(true)
    const navigation = useNavigation()
    const userId = useSelector(state => state.auth.user.id)
    const cardRef = useRef()

    const onDeleteHandler = () => {
        cardRef.current.bounceOutLeft(1000)
                       .then(() => deleteNutrition(item.id))
    }

    const onEditHandler = () => {
        navigation.navigate('NutritionForm',{ type: item.type, item, edit: true,})
    }

    const toggleExpansion = () => {
        setCollaped(exp => !exp)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={toggleExpansion}>
            <Animatable.View ref={cardRef} style={styles.cardRow}>
                <View style={styles.leftColumn}>
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
                            <View style={{marginTop: 5, }}>
                            {
                                item.type === 'FOOD'
                                ?
                                <>
                                    <ListItem.Title>{item.calories} calories</ListItem.Title>
                                    <ListItem.Subtitle>{item.carbs} carbs {item.protein} protein {item.fats} fat</ListItem.Subtitle>
                                    <View>
                                    {
                                        item.micronutrients?.map(macro => {
                                            return (
                                                <React.Fragment key={`macro-${macro?.id}`}>
                                                    <ListItem.Subtitle>
                                                        {`${macro.name} - ${macro?.quantity}${macro.unit.substring(5)/*.tolwerCase() */}`}
                                                    </ListItem.Subtitle>
                                                </React.Fragment>)
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
                !collaped && item?.createdBy === userId && cardEditable
                &&
                <Animatable.View animation='bounceInDown' duration={1500} delay={0} style={styles.rightColumn}>
                    <TouchableOpacity style={styles.container} onPress={onDeleteHandler}>
                        <View style={{...styles.actionButtonWrapper, backgroundColor: '#b0213c' }}>
                            <Icon name='trash-2' type='feather' color='#d6d6d6' size={24} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container} onPress={onEditHandler}>
                        <View style={{...styles.actionButtonWrapper, backgroundColor: colors.backgroundGreen, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                            <Icon name='edit' type='feather' color='white' size={24} />
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            }
            </Animatable.View>
        </TouchableOpacity>
    )
}

const SUPPLEMENT_ICON = {name:'pill', color:'#9c246a', type:'material-community', size:22}
const FOOD_ICON = {name:'food-steak', color:'#9c246a', type:'material-community', size: 30}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardRow: {
        flexDirection: 'row', 
        flex: 1,
        backgroundColor: 'white',
    },
    leftColumn: {
        backgroundColor: colors.platinum, 
        flexDirection: 'column', 
        flex: 5,
    },
    rightColumn: {
        flexDirection: 'column',  
        flex: 1,
    },
    actionButtonWrapper : {
        flexDirection: 'row', 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',  
    }
})

const mapDispatchToProps = dispatch => {
    return {
        deleteNutrition: id => dispatch(deleteNutritionAsync(id))
    }
}

export default connect(null, mapDispatchToProps)(ExpandableCard)