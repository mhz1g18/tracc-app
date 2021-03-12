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

const initialState = {
    foodList: [],
    supplementList: [],
    searchResults: [],
    searchString: ''
}

const reducer = (state, action) => {
    switch (actip.type) {
        case 'REGISTER_SEARCH_ETNRIES':
            return {
                ...state,

            }
        default:
            break;
    }
}

const NutritionEntryScreen = ({navigation, submitEntry, route, ...props}) => {

    const entry = route?.params?.entry

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [itemsList, setItemsList] = useState([])

    const submitHandle = async () => {  

        let foodList = []
        let supplementList = []

        for(let i = 0; i < itemsList.length; i++) {
            if(itemsList[i].type === 'FOOD') {
                foodList.push(itemsList[i])
            } else {
                supplementList.push(itemsList[i])
            }
        }

        const payload = entry ?
        {
            id: entry.id,
            type: 'ENTRY_NUTRITION',
            foodList,
            supplementList,
        }
        :
        {
            type: 'ENTRY_NUTRITION',
            foodList,
            supplementList,
        }

        submitEntry(payload)
        navigation.pop()

    }

    const addToList = useCallback((item, unit, quantity) => {
        const itemToAdd = {...item, unit, quantity}
        setItemsList(list => [...list, itemToAdd])
    }, [setItemsList])




    const fetchResults = async () => {
        let endpoint = `${API_BASE}/api/nutrition/search?`

        if(search.length > 0) {
            endpoint += `name=${search}`
        }

        const token = await AsyncStorage.getItem('traccToken')

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(results.data);
            setSearchResults(results.data)

        } catch(e) {
        }
    }

    useEffect(() => {
        fetchResults()
    }, [search])

    useEffect(() => {
        if(entry) {
            setItemsList(() =>  [...entry?.foodList, ...entry?.supplementList])
        }
    }, [])

    return (
            
                <ScreenContainer title='Nutrition' {...props}>
                    <ScrollView style={{paddingBottom: 150, }}>
                    
                    <View style={{flexDirection: 'column'}}>
                        <SearchBar placeholder='Search by name' 
                                   value={search}
                                   onChangeText={setSearch} 
                                   showLoading={true}
                                   lightTheme 
                                   round />
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        {
                            searchResults.map((result, id) => <NutritionEntryCard onAdd={addToList} key={id} item={result}/>)
                        }
                    </View>
                
                    <View style={{paddingTop: 10, paddingBottom: 10,}}>
                    <ListItem containerStyle={{backgroundColor: '#14d997',  }} >
                        {/* <Avatar icon={{name:'food-steak', color:'#9c246a', type:'material-community', size:33}} rounded/> */}
                        <ListItem.Content>
                            <ListItem.Title style={{color : 'white', fontSize: 19}}>Nutrition</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>  
                    {
                        itemsList.map((item, id) => <NutritionEntryCard  onRemove={() => setItemsList(list => list.filter((_, itemId) => itemId != id))} key={`${item.id}-${id}`} item={item} />)
                    }

                    

                    </View>                     
                    <ListItem containerStyle={{backgroundColor: '#3a2b6b'}} onPress={submitHandle}> 
                        <ListItem.Content>
                            <ListItem.Title style={{color : 'white'}}>Submit</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem containerStyle={{backgroundColor: '#F44336',  justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.pop()}>
                        <ListItem.Content>
                            <ListItem.Title style={{color : 'white', }}>
                                <Text>Cancel</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    </ScrollView>
                </ScreenContainer>
                
        
    )

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitEntry: ownProps.route?.params?.entry ?
                     entry => dispatch(editEntryAsync(entry))
                     :
                     entry => dispatch(addEntryAsync(entry))
    }
}

export default connect(null ,mapDispatchToProps)(NutritionEntryScreen)

