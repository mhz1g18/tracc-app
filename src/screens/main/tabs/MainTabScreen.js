import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabScreen from './HomeTabScreen';
import DairyTabScreen from './DiaryTabScreen';
import ActivitiesTabScreen from './ActivitiesTabScreen'
import NutritionTabScreen from './NutritionTabScreen'
import { colors } from '../../../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

const MainTabScreen = props => {

    return (
        <Tab.Navigator initialRouteName='Home' tabBarOptions={tabBarOptions}>
            <Tab.Screen name='Home' 
                        component={HomeTabScreen}
                        options={{tabBarIcon:  ({color, size}) => <Ionicons name='home' color={color} size={size} />}} />
            <Tab.Screen name='Diary' 
                        component={DairyTabScreen}
                        options={{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name='notebook' color={color} size={size} />}} />
            <Tab.Screen name='Activities' 
                        component={ActivitiesTabScreen}
                        options={{tabBarIcon: ({color, size}) => <FontAwesome name='running' color={color} size={size} />}} />
            <Tab.Screen name='Nutrition' 
                        component={NutritionTabScreen} 
                        options={{tabBarIcon:  ({color, size}) => <Ionicons name='nutrition' color={color} size={size} />}} />
        </Tab.Navigator>
    )
}

const tabBarOptions = {
    activeBackgroundColor: colors.peach,
    inactiveBackgroundColor: colors.peach,
    activeTintColor: colors.blue,
    inactiveTintColor: '#636363',
}

export default MainTabScreen