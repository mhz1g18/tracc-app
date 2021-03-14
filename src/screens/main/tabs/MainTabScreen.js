import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native'
import HomeTabScreen from './HomeTabScreen';
import DairyTabScreen from './DiaryTabScreen';
import ActivitiesTabScreen from './ActivitiesTabScreen'
import NutritionTabScreen from './NutritionTabScreen'
import { colors } from '../../../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialTopTabNavigator()

const MainTabScreen = props => {

    return (
        <Tab.Navigator initialRouteName='Home' tabBarOptions={tabBarOptions} tabBarPosition='bottom'>
            <Tab.Screen name='Home' 
                        component={HomeTabScreen}
                        options={{tabBarIcon:  ({color, size}) => <Ionicons name='home' color={color} size={24} />}} />
            <Tab.Screen name='Diary' 
                        component={DairyTabScreen}
                        options={{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='notebook' color={color} size={24} />}} />
            <Tab.Screen name='Activities' 
                        component={ActivitiesTabScreen}
                        options={{tabBarIcon: ({color, size}) => <FontAwesome name='running' color={color} size={24} />}} />
            <Tab.Screen name='Nutrition' 
                        component={NutritionTabScreen} 
                        options={{tabBarIcon:  ({color, size}) => <Ionicons name='nutrition' color={color} size={24} />}} />
        </Tab.Navigator>
    )
}

const tabBarOptions = {
    showLabel: false,
    showIcon: true,
    indicatorStyle: {
        backgroundColor: 'black'
    },
    activeTintColor: 'white',
    inactiveTintColor: 'black   ',
    tabStyle: {
        //backgroundColor: colors.platinum,
        backgroundColor: '#822a78',
    }
}

export default MainTabScreen