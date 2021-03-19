import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Avatar, Icon, Input, ListItem } from 'react-native-elements'
import { colors } from '../../../../colors'
import ScreenContainer from '../../../../components/ScreenContainer'
import SwipeableFlatList from 'react-native-swipeable-list';
import { connect, useSelector } from 'react-redux'
import { addWorkoutAsync, editWorkoutAsync, removeWorkoutExercise } from '../../../../redux/actions/activitiesActions'
import { TouchableOpacity } from 'react-native'
import ListFooterButton from '../../../../components/ListFooterButton'

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

const WorkoutScreen = ({route, workout, submitWorkout, removeExercise, ...props}) => {

    const [name, setName] = useState(workout?.name)
    const handleNameInput = text => setName(text)

    const onSubmit = () => {
        submitWorkout({...workout, name})
        props.navigation.pop()
    }

    const onAddExerciseHandler = () => props.navigation.navigate('ExercisesScreen')

    const onBackArrowPressHandler = () => props.navigation.pop()

    const QuickActions = (index, qaItem) => {
        return (
          <View style={styles.qaContainer}>
              <TouchableOpacity style={[styles.button, styles.button3, { backgroundColor: '#c91e1e'}]} onPress={() => removeExercise(qaItem.id)}>
                <Icon name='trash-alt' type='font-awesome-5' size={24} color='black'/>
              </TouchableOpacity>
        </View>
        );
    };


    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundGreen}
                         leftComponent={{icon: 'arrow-back-ios', color: 'white', onPress: () => onBackArrowPressHandler()}}
                         rightComponent={<Icon onPress={onSubmit} containerStyle={{marginRight:10}} name='check' type='feather' color='white' size={24}/>}
                         title='Workout'
                         {...props}>
            <View style={styles.wrapper}>
                 <Input placeholder='Workout name' 
                       value={name}
                       onChangeText={handleNameInput}
                       containerStyle={styles.inputContainer} 
                       inputStyle={styles.inputStyle}  
                       inputContainerStyle={styles.inputContainerStyle}/> 
                
                <Text style={{padding: 10, color: '#525252', fontSize: 21}}>Exercises</Text>

                <SwipeableFlatList 
                    keyExtractor={(item, idx) => item?.id?.toString()+idx || idx.toString()}
                    data={workout?.exerciseList}
                    renderItem={({item}) => {
                      return (
                        <ListItem containerStyle={{backgroundColor: 'white', }} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 17,}}>{item.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                      )
                    }}
                    maxSwipeDistance={80}
                    renderQuickActions={({index, item}) => QuickActions(index, item)}
                    contentContainerStyle={styles.contentContainerStyle}
                    shouldBounceOnMount={true}
                    ListFooterComponent={<ListFooterButton buttonTitle='Add exercise' onPress={onAddExerciseHandler}/>} />

            </View>
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
        workout: state.activities.currentWorkout,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeExercise: id => dispatch(removeWorkoutExercise(id)),
        submitWorkout: ownProps.route.params?.edit ?
                       workout => dispatch(editWorkoutAsync(workout)) 
                       :
                       workout => dispatch(addWorkoutAsync(workout))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen) 
