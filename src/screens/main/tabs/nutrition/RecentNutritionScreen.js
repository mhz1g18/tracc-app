import React, { useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'

const RecentNutritionScreen = ({navigation}) => {

    //const [data, setData] = useState({items: [], filteredItems: [],  error: '', loading: false})

    const { search, } = useContext(TabContext)
    const [data, setData] = useState({items: [], filteredItems: [], loading: false, refreshing: false, error: ''})

    const fetchEntries = async (refreshing = false) => {
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
            const itemIds = []


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
            setData(data => ({...data, loading: false, refreshing: false, items: items, filteredItems: items}))
        } catch(e) {
            console.log(e);
            /* setData({items: [], filteredItems: [], loading: false, error: e}) */
            setData(data => ({...data, loading: false, refreshing: false, error: e}))

        }

    }


    const deleteHandler = useCallback(id => {
        setData(data => ({...data, items: data.items.filter(item => item?.id != id), filteredItems: data.filteredItems.filter(item => item?.id != id)}))
    }, [setData])


    useEffect(() => {
        fetchEntries()
    }, [])

    useEffect(() => {
        const filteredItems = data.items.filter(item => item?.name.toUpperCase().includes(search.toUpperCase()))
        setData(data => ({...data, filteredItems}))
    }, [search])
    
    return (
       <>
            <InnerTabWrapper loading={data.loading} items={data.filteredItems} onItemDelete={deleteHandler} onRefresh={() => fetchEntries(true)  } />
       </>
    )
}

export default RecentNutritionScreen