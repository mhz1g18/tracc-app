import React, { useState, useContext, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ListItem, Icon, BottomSheet, Input, Slider,} from 'react-native-elements'
import axios from 'axios';
import { API_BASE } from '../../../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NutritionContext } from '../NutritionContext';
import ScreenContainer from '../../../../../components/ScreenContainer';
import { colors } from '../../../../../colors';
import { addEntryAsync, editEntryAsync } from '../../../../../redux/actions/diaryActions';
import { connect } from 'react-redux';
import EntryHeader from './EntryHeader';
import { convertNumToTime } from '../../../../../utils/timeutils';


const SleepEntryScreen = ({submitEntry, route, ...props}) => {

    const entry = route?.params?.entry
    const [notes, setNotes] = useState(entry?.notes ? entry.notes :  '')
    const [duration, setDuration] = useState(entry?.duration || 0)

    const [durationLabel, setDurationLabel] = useState()

    const submitHandle = async () => {

        const payload = entry ? 
            {
                ...entry,
                type: 'ENTRY_SLEEP',
                duration,
                notes,
            }:
            {
                type: 'ENTRY_SLEEP',
                duration,
                notes,
        }

        console.log(payload);

        submitEntry(payload)
        props.navigation.pop()
    }

    useEffect(() => {
        const label = convertNumToTime(duration.toFixed(2))
        setDurationLabel(label)
    }, [duration])

    return (
        <ScreenContainer rightComponent={<EntryHeader id={entry?.id} onSubmit={submitHandle}/>} 
                         title='Sleep' 
                         {...props}
                         headerBackgroundColor={colors.backgroundPurple}>
            <View style={styles.wrapper}>

                <ListItem containerStyle={styles.header} >
                    <ListItem.Content>
                        <ListItem.Title style={styles.headerText}>Track Sleep</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <Text style={styles.inputLabel}>How did you sleep?</Text>
                <Input  onChangeText={text => setNotes(text)} 
                        value={notes}
                        inputStyle={styles.notesInput}
                        inputContainerStyle={styles.notesInputContainer}/>
                    <Text style={styles.inputLabel}>How many hours did you sleep?</Text>
                    <Slider step={0.25} style={{width: '90%', alignSelf: 'center'}}
                            minimumValue={0} 
                            maximumValue={12} 
                            value={duration} 
                            onValueChange={setDuration} 
                            thumbStyle={styles.sliderThumbStyle} 
                            thumbProps={{
                            children: (
                                <Icon
                                name="bedtime"
                                type="material"
                                size={10}
                                reverse
                                containerStyle={{ bottom: 10, right: 10 }}
                                color='#13115c'
                                />
                            ),}}/>
                    <Text style={styles.durationLabel}>{durationLabel}</Text>
                </View>
                
        </ScreenContainer>
    )

}

const styles = StyleSheet.create({
    notesInputContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 25, 
        marginBottom: -12,
        width: '110%',
        alignSelf: 'center'
    },
    sliderThumbStyle: {
        height: 20, 
        width: 20,  
    },
    durationLabel: {
        paddingLeft: 10, 
        fontSize: 16,
    },
    notesInput: {
        fontSize:14, 
        height: 35, 
        paddingLeft: 20,
        borderWidth: 0,
    },
    wrapper: {
        backgroundColor: 'white', 
        paddingBottom: 10,
    },
    header: {
        backgroundColor: '#13115c', 
        marginBottom: 10,
    }, 
    headerText: {
        color: 'white',
    },
    inputLabel: {
        fontSize: 16, 
        paddingLeft: 10,
    }
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitEntry: ownProps.route?.params?.entry ?
                     entry => dispatch(editEntryAsync(entry))
                     :
                     entry => dispatch(addEntryAsync(entry))
    }
}

export default connect(null ,mapDispatchToProps)(SleepEntryScreen)

