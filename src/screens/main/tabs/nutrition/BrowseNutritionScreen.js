import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'

const BrowseNutritionScreen = ({navigation}) => {

    //const [data, setData] = useState({items: [], filteredItems: [],  error: '', loading: false})
    const [searchVals, setSearchVals] = useState({name: '',})

    const { state, dispatch } = useContext(TabContext)

    const fetchEntries = useCallback(async (searchVals) => {
        let endpoint = `${API_BASE}/api/nutrition/search?`

        if(searchVals.name.length > 0) {
            endpoint += `name=${searchVals.name}`
        }

        const token = await AsyncStorage.getItem('traccToken')

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(results.data);

            dispatch({type: 'LOAD_NUTRITION_SUCCESS', payload: results.data})
        } catch(e) {
            dispatch({type: 'LOAD_NUTRITION_ERROR', payload: e})
        }

    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch({type: 'LOAD_NUTRITION_SUCCESS', payload: []})
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        dispatch({type: 'LOAD_NUTRITION'})
        fetchEntries(searchVals)
    }, [searchVals])
    
    return (
       <>
             <SearchBar  placeholder='Search by name' showLoading
                        lightTheme onChangeText={text => setSearchVals(vals => ({...vals, name: text}))} value={searchVals.name}
                       round />
            <InnerTabWrapper loading={state.loading} items={state.filteredItems} onRefresh={fetchEntries} />
       </>
    )
}

export default BrowseNutritionScreen