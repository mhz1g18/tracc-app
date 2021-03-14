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
import RevealingMenu from '../../../../components/RevealingMenu';

const Tab = createMaterialTopTabNavigator()
const list = [
    { title: 'What would you like to add?'},
    { title: 'Food', screenName: 'NutritionForm', screenParams: { type: 'FOOD' }, icon: {name: 'food-steak', type: 'material-community', color: 'black'} },
    { title: 'Supplement', screenName: 'NutritionForm', screenParams: { type: 'SUPPLEMENT'}, icon: {name: 'pill', type: 'material-community', color: 'black'}},
  ];

const RightHeaderComponent = ({onPress}) => {
    return (
        <Icon  name='plus' type='antdesign' color='#fff' onPress={onPress}/>
    )
}

const MainNutrtionScreen = ({navigation, ...props}) => {

    const [search, setSearch] = useState('')
    const [modalOpened, setModalOpened] = useState(false)

    const filterItemHandler = searchString => {
        setSearch(searchString)
    }

    const deleteItemHandler = useCallback(async id => {

        const token = await AsyncStorage.getItem('traccToken')
        
        try {
            const result = await axios.delete(`${API_BASE}/api/nutrition/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch(e) {
            console.log(e);
        }
        
    }, [])

    const toggleModal = useCallback(() => {
        setModalOpened(state => !state)
    }, [])


    return (
        <ScreenContainer headerBackgroundColor={'#822a78'} 
                         rightComponent={<RightHeaderComponent onPress={toggleModal} />}
                         {...props}>
            <SearchBar onChangeText={filterItemHandler} 
                       value={search} 
                       showLoading={true}
                       placeholder='Type to filter...'
                       round />
                <TabContext.Provider value={{search,  deleteItemHandler}}>
                    <Tab.Navigator lazy={true}>
                        <Tab.Screen name='Recent' component={RecentNutritionScreen} />
                         <Tab.Screen name='My Nutrition' component={MyNutritionScreen}/>
                         <Tab.Screen name='Browse' component={BrowseNutritionScreen}/>
                    </Tab.Navigator>
                </TabContext.Provider>  
                <RevealingMenu isVisible={modalOpened} list={list} toggleModal={toggleModal} />
        </ScreenContainer>
    )
}
 
export default MainNutrtionScreen