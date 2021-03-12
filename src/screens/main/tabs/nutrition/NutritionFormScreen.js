import React, { useReducer, useState } from 'react'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { SearchBar, Icon, ButtonGroup } from 'react-native-elements';
import MyNutritionScreen from './MyNutritionScreen';
import { TabContext } from './TabContext'
import BrowseNutritionScreen from './BrowseNutritionScreen';
import RecentNutritionScreen from './RecentNutritionScreen';
import axios from 'axios'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text } from 'react-native';
import FoodForm from './forms/FoodForm';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NutritionForm from './forms/NutritionForm';


const Tab = createMaterialTopTabNavigator()

const NutritionFormScreen = ({navigation, item, ...props}) => {



    return (
        <ScreenContainer headerBackgroundColor={colors.sonicsilver} 
                         title='Nutrition'
                         {...props}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Tab.Navigator>
                    <Tab.Screen name='Food' component={FoodForm} />
                </Tab.Navigator>

            </View>

        </ScreenContainer>
    )
}
 
export default NutritionFormScreen