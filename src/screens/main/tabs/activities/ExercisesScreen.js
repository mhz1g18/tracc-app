import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { Pressable, Text } from 'react-native'
import { Icon, ListItem, SearchBar } from 'react-native-elements'
import SwipeableFlatList from 'react-native-swipeable-list'
import { connect, useSelector } from 'react-redux'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { addWorkoutExercise, deleteExerciseAsync, fetchExercisesAsync } from '../../../../redux/actions/activitiesActions'
import { API_BASE } from '../../../../utils/api'
import ExerciseCard from './ExerciseCard'
import {exerciseCategories} from './activityTypes'

const darkColors = {
    background: '#121212',
    primary: '#BB86FC',
    primary2: '#3700b3',
    secondary: '#03DAC6',
    onBackground: '#FFFFFF',
    error: '#CF6679',
};
  
const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
};

const ExercisesScreen = ({addToWorkout, loading, fetchExercises, deleteExercise, exercises, ...props}) => {
    
    const [search, setSearch] = useState('')
    const [showExercises, setShowExercises] = useState(false)
    const [filteredExercises, setFilteredExercises] = useState(exercises)

    useEffect(() => {
        if(search.length >= 3) {
            if(showExercises) {
                setFilteredExercises(exercises.filter(ex => ex.name.includes(search)))
            } else {
                fetchExercises(`search?name=${search}`)
            }
        } else {
            setFilteredExercises(exercises)
        }
    }, [search])

    useEffect(() => {
        setFilteredExercises(exercises)
    }, [exercises])

    const showCategoryHandler = categoryName => {
        if(categoryName === 'Cardio') {
            fetchExercises(`search?type=cardio`)
        } else {
            fetchExercises(`search?category=${categoryName}`)
        }
        setShowExercises(true)
    }

    const exercisePressHandler = exercise => {
        addToWorkout(exercise)
        Alert.alert("Added to workout")
    }

    const backArrowPressHandler = () => {
        if(showExercises) {
            setShowExercises(false)
        } else {
            console.log('here');
            props.navigation.goBack()
        }
    }

    const exerciseFormHandler = () => {
        props.navigation.navigate('ExerciseFormScreen')
    }

    const editExerciseFormHandler = (exercise) => {
        props.navigation.navigate('ExerciseFormScreen', {
            exercise
        })
    }

    const QuickActions = (index, qaItem) => {

        if(qaItem.createdBy === 'ADMIN')
            return null

        return (
          <View style={styles.qaContainer}>
              <TouchableOpacity style={[styles.button, styles.button3, { backgroundColor: 'white', }]} onPress={() => editExerciseFormHandler(qaItem)}>
                <Icon name='edit' type='font-awesome-5' size={23} color={colors.backgroundGreen}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.button3, { backgroundColor: '#c91e1e'}]} onPress={() => deleteExercise(qaItem.id)}>
                <Icon name='trash-alt' type='font-awesome-5' size={23} color='black'/>
              </TouchableOpacity>
        </View>
        );
    };  


    return (
        <ScreenContainer title='Exercises'
                     leftComponent={{icon: 'arrow-back-ios', color: 'white', onPress: () => backArrowPressHandler()}}
                     rightComponent={<Icon  name='plus' type='antdesign' color='#fff' onPress={exerciseFormHandler} />}
                     headerBackgroundColor={colors.backgroundGreen}
                     {...props}>
            <SearchBar value={search} placeholder='Search exercises...' onChangeText={text => setSearch(text)} />
            {
                search.length >= 3 || showExercises
                ?
                loading ?
                <View style={{justifyContent: 'center'}}>
                    <ActivityIndicator style={{paddingTop: 30}} color='black' size='large'/>
                </View>
                :
                <SwipeableFlatList keyExtractor={(item, idx) => item.id.toString()}
                          data={filteredExercises}
                          renderItem={({item}) => <ExerciseCard exercise={item} onPress={() => exercisePressHandler(item)}/>}
                          maxSwipeDistance={160}
                          renderQuickActions={({index, item}) => QuickActions(index, item)}
                          contentContainerStyle={styles.contentContainerStyle}
                          shouldBounceOnMount={true}/>
                :
                <FlatList data={exerciseCategories} contentContainerStyle={{paddingBottom: 50}}
                         keyExtractor={(item, idx) => idx.toString()}
                         renderItem={({item}) => (
                             <ListItem bottomDivider onPress={() => showCategoryHandler(item.label)}>
                                 <ListItem.Content>
                                     <ListItem.Title style={{fontSize: 17, paddingLeft: 20}}>{item.label}</ListItem.Title>
                                 </ListItem.Content>
                             </ListItem>
                         )}/>   
            }
           {/*  {
                exercises.map(ex => <Pressable key={ex.id} onPress={() => addToWorkout(ex)}><Text>{ex.name}</Text></Pressable>)
            } */}
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    inputStyle: {
        fontSize:17, 
        height: 40, 
        borderBottomWidth: 0,
        width: '100%',

    },
    inputContainer: {
        paddingHorizontal: 0,
    },
    inputContainerStyle: {
        height: 60,
        borderColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 0, 
        paddingLeft: 10,
        marginBottom: -12,
        alignSelf: 'center',
        width: '100%',
    },
    container: {
        backgroundColor: '#121212',
      },
      itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black',
      },
      qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontWeight: 'bold',
        opacity: colorEmphasis.high,
      },
      button1Text: {
        color: darkColors.primary,
      },
      button2Text: {
        color: darkColors.secondary,
      },
      button3Text: {
        color: darkColors.error,
      },
      contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: darkColors.backgroundColor,
      },
})
const mapStateToProps = state => {
    return {
        loading: state.activities.loadingExercises,
        exercises: state.activities.exercises,
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        fetchExercises: query => dispatch(fetchExercisesAsync(query)),
        addToWorkout: exercise => dispatch(addWorkoutExercise(exercise)),
        deleteExercise: id => dispatch(deleteExerciseAsync(id)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesScreen)