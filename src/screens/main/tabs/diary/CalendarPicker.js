import React from 'react'
import { TouchableWithoutFeedback, View, Dimensions, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { BottomSheet } from 'react-native-elements'



const CalendarPicker = ({isVisible, onDayPress, onClose}) => {

    return (
        <BottomSheet isVisible={isVisible} modalProps={{ onRequestClose: () => onClose()}}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <Calendar onDayPress={onDayPress}
                        hideExtraDays maxDate={today} enableSwipeMonths/>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </BottomSheet>
    )
}

const today = new Date().toISOString().split('T')[0]
const screen_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: screen_height,
        justifyContent: 'flex-end',
    },
})

export default CalendarPicker