import React, { useCallback, useReducer, useState } from 'react'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { SearchBar, Icon } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyNutritionScreen from './MyNutritionScreen';
import { TabContext } from './TabContext'
import BrowseNutritionScreen from './BrowseNutritionScreen';
import RecentNutritionScreen from './RecentNutritionScreen';
import axios from 'axios'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Tab = createMaterialTopTabNavigator()

const initialState = {
    items: [],
    filteredItems: [],
    loading: true,
    refreshing: false,
    error: ''
}

function reducer(state, action) { 
    switch(action.type) {
        case 'LOAD_NUTRITION':
            return {
                ...state,
                loading: true,
            }
        case 'REFRESH_NUTRITION':
            return {
                ...state,
                loading: false,
                refreshing: true,
            }
        case 'LOAD_NUTRITION_ERROR':
            return {
                ...state,
                items: [],
                filteredItems: [],
                loading: false,
                error: action.payload
            }
        case 'LOAD_NUTRITION_SUCCESS':
            return {
                ...state,
                loading: false,
                refreshing: false,
                error: '',
                items: action.payload,
                filteredItems: action.payload
            }
        case 'SET_FILTERED_ITEMS':
            return {
                ...state,
                loading: false,
                error: '',
                filteredItems: action.payload,
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                item: state.items.filter(item => item.id != action.payload),
                filteredItems: state.filteredItems.filter(item => item.id != action.payload)
            }
    }
}

const RightHeaderComponent = ({onPress}) => {
    return (
        <Icon  name='plus' type='antdesign' color='#fff' onPress={onPress}/>
    )
}

const MainNutrtionScreen = ({navigation, ...props}) => {

    const [search, setSearch] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState)
    const [modalOpened, setModalOpened] = useState(false)

    const filterItemHandler = searchString => {
        setSearch(searchString)
        const { items } = state

        if(searchString.length > 3) {
            const filtereditems = items.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()))
            dispatch({type: 'SET_FILTERED_ITEMS', payload: filtereditems})
        } else {
            dispatch({type: 'SET_FILTERED_ITEMS', payload: items})
        }

    }

    const deleteItemHandler = async id => {

        dispatch({type: 'DELETE_ITEM', payload: id})

        const token = await AsyncStorage.getItem('traccToken')
        const result = await axios.delete(`${API_BASE}/api/nutrition/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
    }

    const toggleModal = useCallback(() => {
        setModalOpened(state => !state)
    }, [])


    return (
        <ScreenContainer headerBackgroundColor={colors.sonicsilver} 
                         rightComponent={<RightHeaderComponent onPress={toggleModal} />}
                         {...props}>
            <SearchBar onChangeText={filterItemHandler} 
                       value={search} 
                       showLoading={true}
                       placeholder='Type to filter...'
                       round />
                <TabContext.Provider value={{state, dispatch, deleteItemHandler}}>
                    <Tab.Navigator lazy={true}>
                        <Tab.Screen name='Recent' component={RecentNutritionScreen} />
                         <Tab.Screen name='My Nutrition' component={MyNutritionScreen}/>
                         <Tab.Screen name='Browse' component={BrowseNutritionScreen}/>
                    </Tab.Navigator>
                </TabContext.Provider>  
        </ScreenContainer>
    )
}
 
export default MainNutrtionScreen