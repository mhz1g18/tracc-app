import React, { useEffect, useState } from 'react'
import InnerTabWrapper from './InnerTabWrapper'
import { fetchNutritionAsync, refreshNutritionAsync } from '../../../../redux/actions/nutritionActions'
import { connect } from 'react-redux'

const MyNutritionScreen = ({loading, filterValue, nutritionItems, fetchNutrition, refreshing, refreshNutrition, ...props}) => {

    useEffect(() => {
        fetchNutrition('')
    }, [])

    
    return (
        <InnerTabWrapper 
            loading={loading} 
            items={nutritionItems.filter(item => item.name.toUpperCase().includes(filterValue.toUpperCase()))}
            refreshing={refreshing}
            onRefresh={() => refreshNutrition('')}
            cardEditable={true} />
    )

}


const mapStateToProps = state => {
    return {
        nutritionItems: state.nutrition.items,
        loading: state.nutrition.loading,
        refreshing: state.nutrition.refreshing,
        filterValue: state.nutrition.filterValue,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNutrition: query => dispatch(fetchNutritionAsync(query)), 
        refreshNutrition: query => dispatch(refreshNutritionAsync(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNutritionScreen)