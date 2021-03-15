import React, { useState, useContext, useEffect, useCallback } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ListItem, Icon, BottomSheet,  Slider, Avatar, SearchBar, colors,} from 'react-native-elements'
import axios from 'axios';
import { API_BASE } from '../../../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import NutritionEntryCard from '../../../../../components/NutritionEntryCard';
import ScreenContainer from '../../../../../components/ScreenContainer';
import { addEntryAsync, editEntryAsync } from '../../../../../redux/actions/diaryActions';
import { connect } from 'react-redux';
import { fetchSearchResults, loadEntries, resetEntries } from '../../../../../redux/actions/nutritionEntryActions';
import EntryHeader from './EntryHeader';


const NutritionEntryScreen = ({setItems, itemsList, submitEntry, searchResults,  fetchResults, loadEntries, route, ...props}) => {

    const entry = route?.params?.entry
    const [search, setSearch] = useState('')
    const [nutritionSummary, setNutritionSummary] = useState({})

    const submitHandle = useCallback(async () => {  

        const payload = {
            type: 'ENTRY_NUTRITION',
            foodList: itemsList.filter(item => item.type === 'FOOD'),
            supplementList: itemsList.filter(item => item.type === 'SUPPLEMENT'),
            calculatedValues: true,
        }

        if(entry) {
            payload.id = entry.id
        }

        submitEntry(payload)
        props.navigation.pop()
    }, [submitEntry, entry, props])
   
    useEffect(() => {
        fetchResults(search)
    }, [search])

    useEffect(() => {
        if(entry) {
            const { foodList, supplementList } = entry
            const items = [...foodList, ...supplementList]
            setItems(items)
        } else {
            console.log('resetting items')
            setItems()
        }
    }, [])


    // Function executed to calculate the summary when the 
    // items in the itemsList array change
    useEffect(() => {
        const summary = { calories: 0, protein: 0, fats: 0, carbs: 0, micronutrients: [], supplementList: []}
        if(Array.isArray(itemsList)){

            if(itemsList.length === 0) {
                setNutritionSummary(prev => ({...prev, ...summary}))
                return
            }

            itemsList.forEach(item => {
                console.log('here');
                if(item.type === 'FOOD') {
                    summary.calories += item.calories
                    summary.protein += item.protein
                    summary.carbs += item.carbs
                    summary.fats += item.fats
                    console.log(summary);
                    item.micronutrients.forEach(micro => {
                        const { micronutrients } = summary
                        const index = micronutrients.findIndex(el => micro.id === el.id)
                        console.log(index);
                        if(index !== -1) {
                            micronutrients[index] = {...micronutrients[index], quantity: micronutrients[index].quantity + micro.quantity}
                        } else {
                            micronutrients.push(micro)
                        }
                    })
                } else {
                    const { supplementList } = summary
                    const index = supplementList.findIndex(el => item.id === el.id)
                    if(index === -1) {
                        supplementList.push(item)
                    } else {
                        supplementList[index] = {...supplementList[index], quantity: supplementList[index].quantity + item.quantity}
                    }
                }

                setNutritionSummary(prev => ({...prev, ...summary}))

            })
        }
    }, [itemsList])


    return (
            
                <ScreenContainer title='Nutrition' 
                                 rightComponent={<EntryHeader id={entry?.id} onSubmit={submitHandle}/>} 
                                 {...props}>
                    <ScrollView style={styles.container}>
                        <View style={styles.column}>
                            <SearchBar placeholder='Search by name' 
                                    value={search}
                                    onChangeText={setSearch} 
                                    showLoading={true}
                                    lightTheme 
                                    round />
                        </View>

                        <View style={styles.column}>
                            {
                                searchResults?.map((result, id) => 
                                <NutritionEntryCard searchResult={true} key={id} item={result}/>)
                            }
                        </View>
                    
                        <View style={styles.itemsWrapper}>
                            <ListItem containerStyle={styles.itemsHeader} >
                                <Icon name='local-restaurant' type='material' size={24} color='white'  />   
                                <ListItem.Content>
                                    <ListItem.Title style={styles.itemsHeaderText}>Items</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>  
                            {
                                itemsList?.map((item, id) => 
                                <NutritionEntryCard  onRemove={() => setItemsList(list => list.filter((_, itemId) => itemId != id))} key={`${item.id}-${id}`} item={item} />)
                            }

                        </View> 

                        <ListItem containerStyle={styles.summaryHeader} >
                            <ListItem.Content>
                                <ListItem.Title style={styles.summaryHeaderText}>Summary</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>  
                        <View style={styles.summaryViewWrapper}>
                            <View style={styles.row}>
                                <Text style={styles.label}>{nutritionSummary?.calories?.toFixed(2)} calories</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.subLabel}>{nutritionSummary?.protein?.toFixed(1)}g protein </Text>
                                <Text style={styles.subLabel}>{nutritionSummary?.carbs?.toFixed(1)}g carbs </Text>
                                <Text style={styles.subLabel}>{nutritionSummary?.protein?.toFixed(1)}g fats</Text>
                            </View>
                            {
                            nutritionSummary?.micronutrients?.length > 0 
                            &&
                            <View style={styles.columnPadding}>
                                <Text style={styles.label}>Micronutrients</Text>
                                {nutritionSummary?.micronutrients?.map((micro, id) => {
                                    return (
                                        <Text style={styles.subLabelSmall} key={id}>
                                            {micro.name} - {micro.quantity} {micro.unit.substring(5)}
                                        </Text>
                                    )
                                    })}
                            </View>
                            }

                            {
                            nutritionSummary?.supplementList?.length > 0
                            &&
                            <View style={styles.columnPadding}>
                                <Text style={styles.label}>Supplements</Text>
                                {nutritionSummary?.supplementList?.map((supp, id) => {
                                    return (
                                        <Text style={styles.subLabelSmall} key={id}>
                                            {supp.name} - {supp.quantity} {supp.unit.substring(5)}
                                        </Text>
                                    )
                                    })}
                            </View>
                            }
                    
                        </View>
                    </ScrollView>
                </ScreenContainer>
                
        
    )

}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
    },
    columnPadding: {
        flexDirection: 'column', 
        paddingTop: 10,
    },
    itemsWrapper: {
        paddingBottom: 10,
    },
    itemsHeader: {
        backgroundColor: '#14d997',  
    },
    itemsHeaderText: {
        color : 'white', 
        fontSize: 19,
    },
    container: {
        flex: 1,
        marginBottom: 30
    },
    summaryHeader: {
        backgroundColor: 'purple',  
    },
    summaryHeaderText: {
        color : 'white', 
        fontSize: 19,
    },
    label: {
        fontSize: 16
    },
    subLabel: {
        fontSize: 16,
        color: 'grey',
    },
    subLabelSmall: {
        fontSize: 14,
        color: 'grey',
    },
    summaryViewWrapper: {
        backgroundColor: 'white', 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 20, 
        paddingBottom: 40
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        searchResults: state.nutritionEntry.searchItems,
        itemsList: state.nutritionEntry.itemsList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitEntry: ownProps.route?.params?.entry ?
                     entry => dispatch(editEntryAsync(entry))
                     :
                     entry => dispatch(addEntryAsync(entry)),
        fetchResults: searchString => dispatch(fetchSearchResults(searchString)),
        setItems: ownProps.route?.params?.entry ? 
                entry => dispatch(loadEntries(entry))
                :
                () => dispatch(resetEntries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NutritionEntryScreen)

