import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'

const MyNutritionScreen = ({navigation}) => {

    //const [data, setData] = useState({items: [], filteredItems: [],  error: '', loading: false})

    const { state, dispatch} = useContext(TabContext)

    const fetchEntries = useCallback(async () => {
        const endpoint = `${API_BASE}/api/nutrition/`
        const token = await AsyncStorage.getItem('traccToken')

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({type: 'LOAD_NUTRITION_SUCCESS', payload: results.data})

        } catch(e) {
            console.log(e);
            dispatch({type: 'LOAD_NUTRITION_ERROR', payload: e})

        }

    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch({type: 'LOAD_NUTRITION'})
            fetchEntries()
        });
    
        return unsubscribe;
    }, [navigation]);


    
    return (
        <InnerTabWrapper loading={state.loading} items={state.filteredItems} onRefresh={fetchEntries}/>
    )

}

export default MyNutritionScreen