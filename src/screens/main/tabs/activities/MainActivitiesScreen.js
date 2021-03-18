import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, FlatList, Text, Pressable } from 'react-native'
import { connect, } from 'react-redux'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import { deleteWorkoutAsync, fetchWorkoutsAsync, setActiveWorkout } from '../../../../redux/actions/activitiesActions'
import SwipeableFlatList from 'react-native-swipeable-list';
import { Icon, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native'

const RightHeaderComponent = ({onPress}) => {
  return (
    <Icon name='plus' type='antdesign' color='white' onPress={onPress}/>
  )
}

function renderItemSeparator() {
    return <View style={styles.itemSeparator} />;
  }


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
  
const extractItemKey = item => {
    try {
        return item.id.toString();
    } catch(e) {
        console.log(e);
    }
};

const MainActivitiesScreen = ({fetchWorkouts, setWorkout, deleteWorkout, loading, workouts, state, ...props}) => {

  const onAddPress = () => {
    setWorkout({
      name: '',
      exerciseList: []
    })
    props.navigation.navigate('WorkoutScreen')
  }

  const onWorkoutPress = workout => {
    console.log(setWorkout);
    setWorkout(workout)
    props.navigation.navigate('WorkoutScreen', {
      edit: true
    })
  }

  const deleteItem = id => {
        deleteWorkout(id)
  }
    
  useEffect(() => {
        fetchWorkouts()
  }, [])

  const QuickActions = (index, qaItem) => {
      return (
        <View style={styles.qaContainer}>
            <TouchableOpacity style={[styles.button, styles.button3, { backgroundColor: '#c91e1e'}]} onPress={() => deleteItem(qaItem.id)}>

                <Icon name='trash-alt' type='font-awesome-5' size={24} color='black'/>
          </TouchableOpacity>

      </View>
      );
  };

    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundGreen}
                         title='Workouts'
                         rightComponent={<RightHeaderComponent onPress={onAddPress}/>}
                         {...props}> 
            <View style={styles.wrapper}>
            <SwipeableFlatList
                keyExtractor={extractItemKey}
                data={workouts}
                renderItem={({item}) => (   
                  <ListItem containerStyle={{backgroundColor: 'white',}} onPress={() => onWorkoutPress(item)}>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.exerciseList.length} exercises</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
                maxSwipeDistance={80}
                renderQuickActions={({index, item}) => QuickActions(index, item)}
                contentContainerStyle={styles.contentContainerStyle}
                shouldBounceOnMount={true}
                ItemSeparatorComponent={renderItemSeparator} />
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
        workouts: state.activities.workouts,
        loading: state.activities.loadingWorkouts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWorkouts: () => dispatch(fetchWorkoutsAsync()),
        deleteWorkout: id => dispatch(deleteWorkoutAsync(id)),
        setWorkout: workout => dispatch(setActiveWorkout(workout))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainActivitiesScreen)