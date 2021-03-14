import React, { useState, useContext } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ListItem, Icon, BottomSheet, Input, Slider,} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE } from '../../../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NutritionContext } from '../NutritionContext';
import ScreenContainer from '../../../../../components/ScreenContainer';
import { colors } from '../../../../../colors';
import { addEntryAsync, editEntryAsync } from '../../../../../redux/actions/diaryActions';
import { connect } from 'react-redux';
import EntryHeader from './EntryHeader';


const SleepEntryScreen = ({navigation, submitEntry, route}) => {

    const entry = route?.params?.entry
    const [notes, setNotes] = useState(entry?.notes ? entry.notes :  '')
    const [duration, setDuration] = useState(entry?.duration || 0)

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
        navigation.pop()
    }

    return (
        <ScreenContainer rightComponent={<EntryHeader id={entry?.id} onSubmit={submitHandle}/>} title='Sleep' headerBackgroundColor={colors.sonicsilver}>
            <View style={{backgroundColor: 'white',paddingTop: 10, paddingBottom: 10, /* marginLeft: 10, marginRight: 10, borderRadius: 15, paddingBottom: 10, marginTop: 10, paddingTop: 25, paddingLeft: 15, paddingRight: 15, */}}>
            <ListItem containerStyle={{backgroundColor: '#13115c', marginBottom: 10}} >
                <ListItem.Content>
                    <ListItem.Title style={{color : 'white'}}>Track Sleep</ListItem.Title>
                </ListItem.Content>
            </ListItem>
                    <Text style={{fontSize: 16, paddingLeft: 10}}>How did you sleep?</Text>
                    <Input onChangeText={text => setNotes(text)} value={notes}
                    inputStyle={{ fontSize:14, 
                        height: 35, 
                        paddingLeft: 20,
                        borderWidth: 0}}
                        inputContainerStyle={{
                        borderBottomWidth: StyleSheet.hairlineWidth,
                         backgroundColor: 'white', 
                         opacity: 0.6, 
                         borderRadius: 25, 
                         marginBottom: -12,
                         width: '110%',
                         alignSelf: 'center'}}/>
                    <Text style={{paddingLeft: 10, fontSize: 16}}>How many hours did you sleep?</Text>
                    <Slider step={0.2} style={{width: '90%', alignSelf: 'center'}}
                            minimumValue={0} 
                            maximumValue={12} 
                            value={duration} 
                            onValueChange={setDuration} 
                            thumbStyle={{ height: 20, width: 20,  }} 
                            thumbProps={{
                            children: (
                                <Icon
                                name="bedtime"
                                type="material"
                                size={10}
                                reverse
                                containerStyle={{ bottom: 10, right: 10 }}
                                color="#f50"
                                />
                            ),}}/>
                    <Text style={{paddingLeft: 10, fontSize: 16}}>{duration.toFixed(2)}</Text>
                   {/*  <ListItem containerStyle={{backgroundColor: '#3a2b6b', marginBottom: 5, marginTop: 15,}} onPress={submitHandle}>
                    <ListItem.Content>
                        <ListItem.Title style={{color : 'white'}}>Submit</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem containerStyle={{backgroundColor: '#F44336', justifyContent: 'center', alignItems: 'center'}} 
                        onPress={() => navigation.pop()}>
                    <ListItem.Content>
                        <ListItem.Title style={{color : 'white', }}>
                            <Text>Cancel</Text>
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 15,}}>

                </View> */}
                </View>
                
        </ScreenContainer>
    )

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitEntry: ownProps.route?.params?.entry ?
                     entry => dispatch(editEntryAsync(entry))
                     :
                     entry => dispatch(addEntryAsync(entry))
    }
}

export default connect(null ,mapDispatchToProps)(SleepEntryScreen)

