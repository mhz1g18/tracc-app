import React, { useState, useContext } from 'react'
import {View, Text} from 'react-native'
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


const SleepEntryScreen = ({navigation, submitEntry, route}) => {

    const entry = route?.params?.entry
    console.log(entry);
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

        submitEntry(payload)
        navigation.pop()
    }

    return (
        <ScreenContainer rightComponent={null} title='Sleep' headerBackgroundColor={colors.sonicsilver}>
            <View style={{backgroundColor: 'white', marginTop: 10, paddingTop: 25, paddingLeft: 15, paddingRight: 15,}}>
                    <Text style={{fontSize: 16,}}>How did you sleep?</Text>
                    <Input onChangeText={text => setNotes(text)} value={notes}
                    inputStyle={{ fontSize:14, 
                        height: 35, 
                        borderWidth: 0}}
                        inputContainerStyle={{
                         borderWidth: 1,
                        borderBottomWidth: 1,
                         backgroundColor: 'white', 
                         opacity: 0.6, 
                         borderRadius: 25, 
                         marginBottom: -12,
                         width: '105%',
                         alignSelf: 'center'}}/>
                    <Text style={{paddingLeft: 0, fontSize: 16}}>How many hours did you sleep?</Text>
                    <Slider step={0.2} 
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
                    <Text>{duration.toFixed(2)}</Text>
                    
                </View>
                <ListItem containerStyle={{backgroundColor: '#3a2b6b', marginBottom: 5, marginTop: 15,}} onPress={submitHandle}>
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

