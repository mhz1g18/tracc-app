import React, { useState } from 'react'
import { TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { BottomSheet } from 'react-native-elements'

const today = new Date().toISOString().split('T')[0]
const height = Dimensions.get('window').height

const CalendarPicker = ({isVisible, onDayPress, onClose}) => {

    return (
        <BottomSheet isVisible={isVisible} modalProps={{ onRequestClose: () => onClose()}}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{flex: 1, height, justifyContent: 'flex-end'}}>
                    <TouchableWithoutFeedback>
                        <Calendar onDayPress={onDayPress}
                        hideExtraDays maxDate={today} enableSwipeMonths/>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </BottomSheet>
    )
}

export default CalendarPicker