import React, { useCallback, useState } from 'react'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { SearchBar, Icon } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyNutritionScreen from './MyNutritionScreen';
import BrowseNutritionScreen from './BrowseNutritionScreen';
import RecentNutritionScreen from './RecentNutritionScreen';
import RevealingMenu from '../../../../components/RevealingMenu';
import { setFilterValue } from '../../../../redux/actions/nutritionActions';
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator()

const list = [
    { title: 'What would you like to add?'},
    { title: 'Food', screenName: 'NutritionForm', screenParams: { type: 'FOOD' }, icon: {name: 'food-steak', type: 'material-community', color: 'black'} },
    { title: 'Supplement', screenName: 'NutritionForm', screenParams: { type: 'SUPPLEMENT'}, icon: {name: 'pill', type: 'material-community', color: 'black'}},
  ];

const RightHeaderComponent = ({onPress}) => {
    return (
        <Icon  name='plus' type='antdesign' color='#fff' onPress={onPress}/>
    )
}

const MainNutrtionScreen = ({navigation, search, setSearch, ...props}) => {

    const [modalOpened, setModalOpened] = useState(false)

    const filterItemHandler = searchString => {
        setSearch(searchString)
    }

    const toggleModal = useCallback(() => {
        setModalOpened(state => !state)
    }, [setModalOpened])


    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundGreen} 
                         rightComponent={<RightHeaderComponent onPress={toggleModal} />}
                         {...props}>

            <SearchBar onChangeText={filterItemHandler} 
                       value={search} 
                       showLoading={true}
                       placeholder='Type to filter...'
                       round />

            <Tab.Navigator lazy={true}>
                <Tab.Screen name='Recent' component={RecentNutritionScreen} />
                <Tab.Screen name='My Nutrition' component={MyNutritionScreen}/>
                <Tab.Screen name='Browse' component={BrowseNutritionScreen}/>
            </Tab.Navigator>
            
            <RevealingMenu isVisible={modalOpened} list={list} toggleModal={toggleModal} />
        </ScreenContainer>
    )
}

const mapStateToProps = state => {
    return {
        search: state.nutrition.filterValue,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSearch: searchValue => dispatch(setFilterValue(searchValue))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MainNutrtionScreen)