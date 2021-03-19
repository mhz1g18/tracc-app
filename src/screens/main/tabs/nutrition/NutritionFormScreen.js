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
import { addNutritionAsync, editNutritionAsync } from '../../../../redux/actions/nutritionActions';
import { connect } from 'react-redux';

const SupplementFormScreen = ({route, submitNutrition, ...props}) => {   

    const [form, setForm] = useState(route.params?.item || {type: route.params.type})

    const onSubmit = () => {
        submitNutrition(form)
        props.navigation.pop()
    }

    const onBackArrowPressHandler = () => {
        props.navigation.pop()
    }

    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundGreen} 
                         leftComponent={{icon: 'arrow-back-ios', color: 'white', onPress: () => onBackArrowPressHandler()}}
                         rightComponent={
                         <Icon onPress={onSubmit} containerStyle={{marginRight:10}} name='check' type='feather' color='white' size={24}/>}
                         title={route.params.type.charAt(0) + route.params.type.slice(1).toLowerCase()}
                         {...props}>
            <View style={styles.wrapper}>
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
    wrapper: {
        flex: 1,
    },
})
 
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitNutrition: ownProps.route?.params?.edit ?
                         nutrition => dispatch(editNutritionAsync(nutrition))
                         :
                         nutrition => dispatch(addNutritionAsync(nutrition))
    }
}

export default connect(null, mapDispatchToProps)(SupplementFormScreen)