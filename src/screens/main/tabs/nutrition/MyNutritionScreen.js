import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'

const MyNutritionScreen = ({navigation}) => {

    const { search, } = useContext(TabContext)
    const [data, setData] = useState({items: [], filteredItems: [], loading: false, refreshing: false, error: ''})

    const fetchEntries = async (refreshing = false) => {
        setData(data => ({...data, loading: !refreshing, refreshing: refreshing}))
        const endpoint = `${API_BASE}/api/nutrition/`
        const token = await AsyncStorage.getItem('traccToken')

        try {
            const results = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setData(data => ({...data, loading: false, refreshing: false, items: results.data, filteredItems: results.data}))

        } catch(e) {
            console.log(e);
            setData(data => ({...data, loading: false, refreshing: false, error: e}))

        }

    }

    const deleteHandler = useCallback(id => {
        setData(data => ({...data, items: data.items.filter(item => item.id != id), filteredItems: data.filteredItems.filter(item => item.id != id)}))
    }, [setData])

    useEffect(() => {
        fetchEntries()
    }, [])

    useEffect(() => {
        const filteredItems = data.items.filter(item => item.name.toUpperCase().includes(search.toUpperCase()))
        setData(data => ({...data, filteredItems}))
    }, [search])
    
    return (
        <InnerTabWrapper loading={data.loading} items={data.filteredItems} onItemDelete={deleteHandler} onRefresh={() => fetchEntries(true)}/>
    )

}

export default MyNutritionScreen