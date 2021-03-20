import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native'
import { Input, Icon, ListItem } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { units } from '../../../../../utils/units'
import TagInput from 'react-native-tags-input'
import ListFooterButton from '../../../../../components/ListFooterButton';
import SwipeableFlatList from 'react-native-swipeable-list';
import { connect } from 'react-redux';
import { editNutritionFormMicro, setNutritionForm, removeNutritionFormMicro } from '../../../../../redux/actions/nutritionActions';
import { useNavigation } from '@react-navigation/core';

const FoodForm = ({setForm, nutritionForm, editMicroQuantity, removeMicro }) => {

    const [tags, setTags] = useState({tag: '', tagsArray: nutritionForm?.categories || []})
    const navigation = useNavigation()

    const updateCategories = category => {
        setTags(category)
    }

    useEffect(() => {
        setForm({...nutritionForm, categories: tags.tagsArray})
    }, [tags.tagsArray.length])

    const nameInputHandler = (text, field) => {
        setForm({...nutritionForm, [field]: text})
    }

    const unitInputHandler = item => {
        setForm({...nutritionForm, unit: item.value})
    }


    const changeMicroQuantity = (id, quantity) => {
        editMicroQuantity(id, quantity) 
    }

    const QuickActions = (index, qaItem) => {
        return (
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-end',}}>
              <TouchableOpacity style={[{width: 80, alignItems: 'center',justifyContent: 'center', backgroundColor: '#c91e1e'}]}
                                onPress={() => removeMicro(qaItem.id)}>
                <Icon name='trash-alt' type='font-awesome-5' size={24} color='black'/>
              </TouchableOpacity>
        </View>
        );
    };

    return (
        <ScrollView style={styles.wrapper} contentContainerStyle={{paddingBottom: 1000}}>
            <Input placeholder='Food name' 
                    inputStyle={styles.inputStyle}  
                    value={nutritionForm?.name} 
                   onChangeText={text => nameInputHandler(text, 'name')}
                   containerStyle={styles.inputContainer}
                   inputContainerStyle={styles.inputContainerStyle}  />

            <Text style={styles.label}>Categories</Text>

            <TagInput updateState={updateCategories} 
                    tags={tags}
                    inputStyle={styles.inputStyle}
                    tagStyle={{backgroundColor: 'white', borderWidth: StyleSheet.hairlineWidth}}
                    containerStyle={{paddingHorizontal: 0}}
                    inputContainerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5, opacity: 0.6 }}/>
            <View style={styles.inputRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>Calories</Text>
                    <Input placeholder='Calories' 
                            inputStyle={styles.inputStyle} 
                           keyboardType='numeric' 
                           value={nutritionForm?.calories?.toString()} 
                           onChangeText={text => nameInputHandler(text, 'calories')}
                           inputContainerStyle={{...styles.inputContainerStyle, height: 40}}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Quantity</Text>
                    <Input placeholder='Quantity' 
                            inputStyle={styles.inputStyle} 
                           keyboardType='numeric' 
                           value={nutritionForm?.quantity?.toString()} 
                           onChangeText={text => nameInputHandler(text, 'quantity')}
                           inputContainerStyle={{...styles.inputContainerStyle, height: 40}}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Unit</Text>
                    <DropDownPicker items={units}
                                    defaultValue={nutritionForm?.unit || 'UNIT_G'}
                                    containerStyle={{height: 40,  width: '98%', paddingLeft: 4}}
                                    style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                                    itemStyle={{
                                        paddingLeft: 15, 
                                        justifyContent: 'flex-start'
                                    }}
                                    placeholder='Measurement Unit'
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={unitInputHandler}/>
            
                </View>
            </View>

           
            <View style={styles.inputRow}>
                <View style={styles.column}>
                    <Text style={styles.label}>Protein</Text>
                    <Input placeholder='Protein' 
                            inputStyle={styles.inputStyle} 
                            keyboardType='numeric' 
                            value={nutritionForm?.protein?.toString()} 
                            onChangeText={text => nameInputHandler(text, 'protein')}
                            inputContainerStyle={{...styles.inputContainerStyle, height: 40,}}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Fats</Text>
                    <Input placeholder='Fats' 
                            inputStyle={styles.inputStyle} 
                            keyboardType='numeric' 
                            value={nutritionForm?.fats?.toString()} 
                            onChangeText={text => nameInputHandler(text, 'fats')}
                            inputContainerStyle={{...styles.inputContainerStyle, height: 40}}  />
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Carbs</Text>
                    <Input placeholder='Carbs'  
                            inputStyle={styles.inputStyle} 
                            keyboardType='numeric' 
                            value={nutritionForm?.carbs?.toString()} 
                            onChangeText={text => nameInputHandler(text, 'carbs')}
                            inputContainerStyle={{...styles.inputContainerStyle, height: 40}}  />
                </View>
            </View>
                <Text style={styles.label}>Micronutrients</Text>
                <SwipeableFlatList 
                    keyExtractor={(item, idx) => item?.id?.toString()+idx || idx.toString()}
                    data={nutritionForm?.micronutrients}
                    renderItem={({item}) => {
                      return (
                        <ListItem containerStyle={{backgroundColor: 'white', }} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 17,}}>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                        <Input placeholder='Quantity' 
                                            inputStyle={{...styles.inputStyle, width: '50%', paddingVertical: 0}} 
                                            keyboardType='numeric' 
                                            value={item?.quantity?.toString()} 
                                            onChangeText={text =>changeMicroQuantity(item.id, text)}
                                            inputContainerStyle={{...styles.inputContainerStyle, height: 40, paddingVertical: 0}}  />
                            </View>
                            <Text>haa</Text>
                        </ListItem>
                      )
                    }}
                    maxSwipeDistance={80}
                    renderQuickActions={({index, item}) => QuickActions(index, item)}
                    contentContainerStyle={styles.contentContainerStyle}
                    shouldBounceOnMount={true}
                    ListFooterComponent={<ListFooterButton buttonTitle='Add micronutrient' onPress={() => navigation.navigate('MicronutrientsScreen')} />} />

        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        nutritionForm: state.nutrition.form,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setForm: form => dispatch(setNutritionForm(form)),
        editMicroQuantity: (id, quantity) => dispatch(editNutritionFormMicro(id, quantity)),
        removeMicro: id => dispatch(removeNutritionFormMicro(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm)


const styles = StyleSheet.create({
    wrapper: {
        /* justifyContent: 'center', 
        alignItems: 'center', */
        flex: 1,
        paddingBottom: 150,
    },
    inputStyle: {
        fontSize:16, 
        height: 40, 
        borderBottomWidth: 0,
        width: '100%',
    },
    inputContainer: {
        paddingHorizontal: 0,
    },
    inputContainerStyle: {
        height: 60,
        paddingHorizontal: 0,
        borderColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 0, 
        paddingLeft: 10,
        marginBottom: -20,
        alignSelf: 'center',
        width: '100%',
    },
    column: {
        flexDirection: 'column', 
        flex: 1
    },
    inputRow: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 16,
        padding: 15,
        paddingBottom: 10,
        paddingLeft: 12,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
})