import React, { useEffect, useReducer, useState } from 'react'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { SearchBar, Icon } from 'react-native-elements';
import MyNutritionScreen from './MyNutritionScreen';
import { TabContext } from './TabContext'
import BrowseNutritionScreen from './BrowseNutritionScreen';
import RecentNutritionScreen from './RecentNutritionScreen';
import axios from 'axios'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, Alert, StyleSheet } from 'react-native';
import FoodForm from './forms/FoodForm';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SupplementForm from './forms/SupplementForm';
import { Input, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core';

const SupplementFormScreen = ({route, ...props}) => {   

    const [form, setForm] = useState(route.params?.item || {type: route.params.type})
    const navigation = useNavigation()

    const onSubmit = async () => {
        console.log(form);
        let endpoint = `${API_BASE}/api/nutrition/`
        const token = await AsyncStorage.getItem('traccToken')
        
        try {
            if(route.params.edit) {
                endpoint += route.params.item.id
                console.log(endpoint);
                const results = await axios.put(endpoint, form, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(results.data);
            } else {
                const results = await axios.post(endpoint, form, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
    
            navigation.pop() 
        } catch(e) {
            Alert.alert('Error ' + e)
            console.log(e);
        }
    }

    useEffect(() => {
        if(route.params.item) {
            setForm(route.params.item)
        }
    }, [route.params.item])

    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundPurple} 
                        rightComponent={
                        <Icon onPress={onSubmit} containerStyle={{marginRight:10}} name='check' type='feather' color='white' size={24}/>}
                         title={route.params.type.charAt(0) + route.params.type.slice(1).toLowerCase()}
                         {...props}>
            <View style={styles.formWrapper}>
                {
                    route.params.type === 'SUPPLEMENT'
                    ?
                    <SupplementForm setForm={setForm} form={form} />
                    :
                    <FoodForm setForm={setForm} form={form} />
                }
             
            </View>

        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    formWrapper: {
        alignItems: 'center', 
        flex: 1, 
        backgroundColor: 'white'
    }
})
 
export default SupplementFormScreen