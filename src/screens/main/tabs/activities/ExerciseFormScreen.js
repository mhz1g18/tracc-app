import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { colors } from '../../../../colors'
import ScreenContainer from "../../../../components/ScreenContainer"
import DropDownPicker from 'react-native-dropdown-picker';
import {exerciseTypes, exerciseCategories } from './activityTypes'
import { addExerciseAsync, editExerciseAsync } from '../../../../redux/actions/activitiesActions'
import { connect } from 'react-redux'


const ExerciseFormScreen = ({route, onExerciseSubmit, ...props}) => {

    const [form, setForm] = useState(route.params?.exercise || {})

    const nameInputHandler = text => {
        setForm(form => ({...form, name: text}))
    }

    const typeInputHandler = type => {
        setForm(form => ({...form, type: type.value}))
    }

    const categoryInputHandler = category => {
        setForm(form => ({...form, category: category.value}))
    }

    const onSubmit = () => {
        onExerciseSubmit(form)
        props.navigation.pop()
    }

    return (
    
        <ScreenContainer title='Exercise'
                         headerBackgroundColor={colors.backgroundGreen}
                         rightComponent={
                            <Icon onPress={onSubmit} containerStyle={{marginRight:10}} name='check' type='feather' color='white' size={24}/>}
                         {...props}>
            <View style={styles.wrapper}>
                <Input placeholder='Exercise name' 
                        value={form?.name}
                        onChangeText={nameInputHandler}
                        containerStyle={styles.inputContainer} 
                        inputStyle={styles.inputStyle}  
                        inputContainerStyle={styles.inputContainerStyle}/> 
                <Text style={styles.label}>Exercise type</Text>
                <DropDownPicker items={exerciseTypes}
                                defaultValue={form?.type}
                                containerStyle={{height: 50,  width: '100%'}}
                                style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                                itemStyle={{
                                    paddingLeft: 15, 
                                    justifyContent: 'flex-start'
                                }}
                                onChangeItem={typeInputHandler}
                                placeholder='Choose a type...'
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                />

                <Text style={styles.label}>Muscle category</Text>
                <DropDownPicker items={exerciseCategories}
                                containerStyle={{height: 50,  width: '100%'}}
                                defaultValue={form?.category}
                                style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                                itemStyle={{
                                    paddingLeft: 15, 
                                    justifyContent: 'flex-start'
                                }}
                                onChangeItem={categoryInputHandler}
                                placeholder='Choose a category...'
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                />
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
    label: {
        fontSize: 17,
        padding: 15,
        paddingBottom: 10,
        paddingLeft: 5,
    }
})


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onExerciseSubmit: ownProps.route?.params?.exercise 
                        ?
                        exercise => dispatch(editExerciseAsync(exercise))
                        :
                        exercise => dispatch(addExerciseAsync(exercise))
    }
}

export default connect(null, mapDispatchToProps)(ExerciseFormScreen)