import React, { useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import { LogBox } from 'react-native'
import { LocaleConfig } from 'react-native-calendars'
import { useFocusEffect } from '@react-navigation/core'

const RecentNutritionScreen = ({navigation}) => {

    //const [data, setData] = useState({items: [], filteredItems: [],  error: '', loading: false})

    const { state, dispatch} = useContext(TabContext)

    const fetchEntries = useCallback(async () => {
        let endpoint = `${API_BASE}/api/user/diary/entries?type=ENTRY_NUTRITION`
        const token = await AsyncStorage.getItem('traccToken')

        //setData(data => ({...data, loading: true}))

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const items = []

            for(let i = 0; i < results.data.length; i++) {

                const foodList = results.data[i].foodList
                const supplementList = results.data[i].supplementList


                 for(let j = 0; j < foodList.length; j++) {
                    items.push(foodList[j])
                }

                for(let y = 0; y < supplementList.length; y++) {
                    items.push(supplementList[y].supplementList)
                }

                if(items.length > 20) break
            }

            //setData(data => ({...data, items: items, filteredItems: items, loading: false, error: ''}))
            dispatch({type: 'LOAD_NUTRITION_SUCCESS', payload: items})
        } catch(e) {
            console.log(e);
            /* setData({items: [], filteredItems: [], loading: false, error: e}) */
            dispatch({type: 'LOAD_NUTRITION_ERROR', pyaload: e})
        }

    }, [])

  /*   useFocusEffect(
        useCallback(() => {
            dispatch({type: 'LOAD_NUTRITION'})
            fetchEntries()
        }, [])
    ) */

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('here');
            dispatch({type: 'LOAD_NUTRITION'})
            fetchEntries()
        });
    
        return unsubscribe;
    }, [navigation]);

    
    return (
       <>
            <InnerTabWrapper loading={state.loading} items={state.filteredItems} onRefresh={fetchEntries} />
       </>
    )
}

export default RecentNutritionScreen