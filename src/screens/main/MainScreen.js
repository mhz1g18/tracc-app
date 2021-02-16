import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './tabs/MainTabScreen';
import DrawerContent from './drawer/DrawerContent';

const Drawer = createDrawerNavigator()

const MainScreen = props => {

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='MainTabScreen' component={MainTabScreen}/>
        </Drawer.Navigator>
    )
}


export default MainScreen