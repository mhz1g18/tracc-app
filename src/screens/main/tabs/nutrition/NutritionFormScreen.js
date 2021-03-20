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
import { addNutritionAsync, editNutritionAsync, setNutritionForm } from '../../../../redux/actions/nutritionActions';
import { connect } from 'react-redux';

const SupplementFormScreen = ({route, nutritionForm, setForm, submitNutrition, ...props}) => {   


    const onSubmit = () => {
        submitNutrition(nutritionForm)
        props.navigation.pop()
    }

    const onBackArrowPressHandler = () => {
        props.navigation.pop()
    }

    useEffect(() => {
        if(route.params.item) {
            if(route.params.type === 'SUPPLEMENT') {
                setForm({...route.params.item})
            } else {
                let micronutrientIds = {}
                for(let i = 0; i < route.params.item.micronutrients.length; i++) {
                    let micro = route.params.item.micronutrients[i]
                    micronutrientIds[micro.id] = micro.quantity
                }
                console.log(micronutrientIds);
                setForm({...route.params.item, micronutrientIds: micronutrientIds})
            }
        } else {
            setForm({type: route.params.type})
        }
    }, [route.params])

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
                    <SupplementForm  />
                    :
                    <FoodForm  />
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

const mapStateToProps = state => {
    return {
        nutritionForm: state.nutrition.form,
    }
}
 
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitNutrition: ownProps.route?.params?.edit ?
                         nutrition => dispatch(editNutritionAsync(nutrition))
                         :
                         nutrition => dispatch(addNutritionAsync(nutrition)),
        setForm: form => dispatch(setNutritionForm(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplementFormScreen)