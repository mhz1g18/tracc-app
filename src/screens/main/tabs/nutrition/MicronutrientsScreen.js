import React, { useEffect, useState } from 'react'
import ScreenContainer from '../../../../components/ScreenContainer'
import { Icon, ListItem, SearchBar } from 'react-native-elements'
import { colors } from '../../../../colors'
import { addNutritionFormMicro, fetchMicronutrientsAsync } from '../../../../redux/actions/nutritionActions'
import { connect } from 'react-redux'
import { Text, View, ActivityIndicator, FlatList, Alert} from 'react-native'


const MicronutrientsSreen = ({fetchMicros, micronutrients, loading, addMicroToNutrition, ...props}) => {

    const [search, setSearch] = useState()

    const backArrowPressHandler = () => {
        props.navigation.pop()
    }

    const addToNutritionHandler = micronutrient => {
        console.log(micronutrient);
        addMicroToNutrition(micronutrient)
        Alert.alert('Added to nutrition')
    }

    useEffect(() => {
        fetchMicros(search)
    }, [search])

    console.log(micronutrients);
    
    return (
        <ScreenContainer title='Micronutrients'
                         leftComponent={{icon: 'arrow-back-ios', color: 'white', onPress: () => backArrowPressHandler()}}
                         rightComponent={<Icon  name='plus' type='antdesign' color='#fff' />}
                         headerBackgroundColor={colors.backgroundGreen}
                         {...props}>
            <SearchBar value={search} placeholder='Search micronutrients...' onChangeText={setSearch} />
            {
                loading ?
                <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
                    <ActivityIndicator size='large' color='black'/>
                </View>
                :
                <FlatList data={micronutrients}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => {
                              return (
                                <ListItem onPress={() => addToNutritionHandler(item)}>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    <ListItem.Subtitle>
                                        {item.categories?.map(cat => `${cat} `)}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                </ListItem>
                              )
                                }} />
            }

        </ScreenContainer>
    )
}

const mapStateToProps = state => {
    return {
        micronutrients: state.nutrition.micronutrients,
        loading: state.nutrition.micronutrientsLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMicroToNutrition: micro => dispatch(addNutritionFormMicro(micro)),
        fetchMicros: searchVal => dispatch(fetchMicronutrientsAsync(searchVal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MicronutrientsSreen)