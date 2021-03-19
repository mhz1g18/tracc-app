import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE } from '../../../../utils/api'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InnerTabWrapper from './InnerTabWrapper'
import { TabContext } from './TabContext'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { searchNutritionAsync } from '../../../../redux/actions/nutritionActions'

const BrowseNutritionScreen = ({filterValue, loading, items, searchNutrition, navigation}) => {

    useEffect(() => {
        try {
            if(filterValue && filterValue.length>3) {
                searchNutrition(filterValue)
            }
        } catch(e) {
            console.log(e);
        }
    }, [filterValue])

    return (
        <InnerTabWrapper 
            loading={loading} 
            items={items}
            refreshing={false} />
    )
}

const mapStateToProps = state => {
    return {
        loading: state.nutrition.searchLoading,
        items: state.nutrition.searchItems,
        filterValue: state.nutrition.filterValue,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchNutrition: searchValue => dispatch(searchNutritionAsync(searchValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseNutritionScreen)