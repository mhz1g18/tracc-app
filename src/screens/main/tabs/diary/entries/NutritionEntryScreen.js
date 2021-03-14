import React, { useState, useContext, useEffect, useCallback } from 'react'
import {View, Text} from 'react-native'
import { ListItem, Icon, BottomSheet,  Slider, Avatar, SearchBar,} from 'react-native-elements'
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


const NutritionEntryScreen = ({navigation, setItems, itemsList, submitEntry, searchResults,  fetchResults, loadEntries, route, ...props}) => {

    const entry = route?.params?.entry
    console.log(entry?.id)
    const [search, setSearch] = useState('')
    //const [searchResults, setSearchResults] = useState([])
    //const [itemsList, setItemsList] = useState([])

    const submitHandle = async () => {  

        const payload = {
            type: 'ENTRY_NUTRITION',
            foodList: itemsList.filter(item => item.type === 'FOOD'),
            supplementList: itemsList.filter(item => item.type === 'SUPPLEMENT')
        }

        if(entry) {
            payload.id = entry.id
        }

        submitEntry(payload)
        navigation.pop()
    }
   
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


    return (
            
                <ScreenContainer title='Nutrition' rightComponent={<EntryHeader id={entry?.id} onSubmit={submitHandle}/>} {...props}>
                    <ScrollView >
                        <View style={{flexDirection: 'column'}}>
                            <SearchBar placeholder='Search by name' 
                                    value={search}
                                    onChangeText={setSearch} 
                                    showLoading={true}
                                    lightTheme 
                                    round />
                        </View>

                        <View style={{flexDirection: 'column', }}>
                            {
                                searchResults?.map((result, id) => <NutritionEntryCard searchResult={true} key={id} item={result}/>)
                            }
                        </View>
                    
                        <View style={{paddingTop: 10, paddingBottom: 10,}}>
                            <ListItem containerStyle={{backgroundColor: '#14d997',  }} >
                                {/* <Avatar icon={{name:'food-steak', color:'#9c246a', type:'material-community', size:33}} rounded/> */}
                                <ListItem.Content>
                                    <ListItem.Title style={{color : 'white', fontSize: 19}}>Items</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>  
                            {
                                itemsList?.map((item, id) => <NutritionEntryCard  onRemove={() => setItemsList(list => list.filter((_, itemId) => itemId != id))} key={`${item.id}-${id}`} item={item} />)
                            }

                        </View> 
                        {
                            entry &&
                            <>
                                <ListItem containerStyle={{backgroundColor: 'purple',  }} >
                                    <ListItem.Content>
                                        <ListItem.Title style={{color : 'white', fontSize: 19}}>Summary</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>  
                                <View style={{backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 16}}>{entry.calories.toFixed(2)} calories</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 16, color: 'grey'}}>{entry.protein.toFixed(1)}g protein </Text>
                                        <Text style={{fontSize: 16, color: 'grey'}}>{entry.carbs.toFixed(1)}g carbs </Text>
                                        <Text style={{fontSize: 16, color: 'grey'}}>{entry.protein.toFixed(1)}g fats</Text>
                                    </View>
                                    <View style={{flexDirection: 'column', paddingTop: 10}}>
                                        <Text style={{fontSize: 16}}>Micronutrients</Text>
                                        {entry.micronutrients.map((micro, id) => {
                                            return (
                                                <Text style={{fontSize: 14, color: 'grey'}} key={id}>
                                                    {micro.name} - {micro.quantity} {micro.unit}
                                                </Text>
                                            )
                                        })}
                                    </View>
                                </View>
                            </>
                        }                    
                    </ScrollView>
                </ScreenContainer>
                
        
    )

}

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

