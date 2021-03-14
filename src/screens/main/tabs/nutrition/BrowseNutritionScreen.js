import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'

const BrowseNutritionScreen = ({navigation}) => {

    const [data, setData] = useState({items: [], filteredItems: [],  error: '', loading: false})
    const [searchVals, setSearchVals] = useState({name: '',})

    const { search, } = useContext(TabContext)

    const fetchEntries = async (searchVals) => {

        if(searchVals.length < 2) {
            setData(data => ({...data, loading: false}))
            return
        }

        setData(data => ({...data, loading: true,}))
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

            setData(data => ({...data, loading: false, error: '', items: results.data, filteredItems: results.data,}))

        } catch(e) {
            setData(data => ({...data, error: e}))
        }

    }

    const deleteHandler = useCallback(id => {
        setData(data => ({...data, items: data.items.filter(item => item.id != id), filteredItems: data.filteredItems.filter(item => item.id != id)}))
    }, [setData])


    useEffect(() => {
        fetchEntries(searchVals)
    }, [searchVals])

    useEffect(() => {
        const filteredItems = data.items.filter(item => item.name.toUpperCase().includes(search.toUpperCase()))
        setData(data => ({...data, filteredItems}))
    }, [search])
    
    
    return (
       <>
             <SearchBar  placeholder='Search by name' showLoading
                        lightTheme onChangeText={text => setSearchVals(vals => ({...vals, name: text}))} value={searchVals.name}
                       round />
            <InnerTabWrapper loading={data.loading} items={data.filteredItems} onItemDelete={deleteHandler} onRefresh={fetchEntries} />
       </>
    )
}

export default BrowseNutritionScreen