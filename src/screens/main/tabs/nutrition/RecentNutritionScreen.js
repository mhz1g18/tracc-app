import React, { useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { getRecentNutritionAsync } from '../../../../redux/actions/nutritionActions'
import { connect } from 'react-redux'

const RecentNutritionScreen = ({loading, filterValue, nutritionItems, fetchNutrition}) => {

    useEffect(() => {
        fetchNutrition()
    }, [])
    
    return (
        <InnerTabWrapper 
            loading={loading} 
            items={nutritionItems.filter(item => item.name.toUpperCase().includes(filterValue.toUpperCase()))} 
            refreshing={false}/>)
}

const mapStateToProps = state => {
    return {
        nutritionItems: state.nutrition.recentItems,
        loading: state.nutrition.recentLoading,
        filterValue: state.nutrition.filterValue,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNutrition: () => dispatch(getRecentNutritionAsync()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentNutritionScreen)