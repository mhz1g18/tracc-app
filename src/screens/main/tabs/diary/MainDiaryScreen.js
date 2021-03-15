import React, { useEffect, useState, useCallback, useReducer, useRef, useContext } from 'react'
import { View, RefreshControl, Dimensions, StyleSheet } from 'react-native'
import ScreenContainer from '../../../../components/ScreenContainer'
import RevealingMenu from '../../../../components/RevealingMenu'
import EntriesListView from './EntriesListView'
import DiaryHeader from './DiaryHeader'
import CalendarPicker from './CalendarPicker'
import { colors } from '../../../../colors'
import { API_BASE } from '../../../../utils/api'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Icon } from 'react-native-elements'
import SleepEntryScreen from './entries/SleepEntryScreen'
import { NutritionContext } from './NutritionContext'
import NutritionEntryScreen from './entries/NutritionEntryScreen'
import { getEntriesForDate, refreshEntriesForDate } from '../../../../redux/actions/diaryActions'
import { connect } from 'react-redux'


const list = [
    { title: 'What would you like to add?'},
    { title: 'Nutrition', screenName: 'Nutrition', icon: {name: 'local-restaurant', type: 'material', color: 'black'} },
    { title: 'Sleep', screenName: 'Sleep',  icon: {name: 'bedtime', type: 'material', color: 'black'}},
    { title: 'Activity', onPress: () => console.log('hahahah'), icon: { name: 'weight-lifter', type: 'material-community', color: 'black'} }
  ];


const RightHeaderComponent = ({onPressCalendar, onPressAddEntry, }) => {
    return (
        <View style={styles.row}>
            <Icon containerStyle={{paddingRight: 10,}} name='plus' type='antdesign' color='#fff' onPress={onPressAddEntry}/>
            <Icon name='calendar' type='antdesign' color='#fff' onPress={onPressCalendar}/>
        </View>
    )
}
  
const MainDiaryScreen = ({fetchEntries, diary, refreshEntries, ...props}) => {

    const [date, setDate] = new useState(new Date())
    const [modalOpened, setModalOpened] = useState(false)
    const [calendarVisible, setCalendarVisible] = useState(false)

    const toggleModal = useCallback(() => {
        setModalOpened(state => !state)
    }, [setModalOpened])

    const toggleCalendar = useCallback(() => {
        setCalendarVisible(value => !value)
    }, [setCalendarVisible])

    const closeCalendar = useCallback(() => {
        setCalendarVisible(false)
    }, [setCalendarVisible])

    const onCalendarDayPress = useCallback(date => {
        setCalendarVisible(value => !value)
        setDate(new Date(date.timestamp));
    }, [setCalendarVisible, setDate])

    const setDateBack = useCallback(() => {
        setDate(date => new Date(date.setDate(date.getDate() - 1)))
    }, [])

    const setDateNext = useCallback(() => {
        setDate(date => new Date(date.setDate(date.getDate() + 1)))
    }, [])


    useEffect(() => {
        fetchEntries(date)
    }, [date])

    
    return (    
        <ScreenContainer rightComponent={<RightHeaderComponent onPressAddEntry={toggleModal} onPressCalendar={toggleCalendar}/>}
                         headerBackgroundColor={'#822a78'}  
                   /*       refreshControl={<RefreshControl onRefresh={fetchData}/>} */
                         {...props}>
            <View style={styles.container}>
                <DiaryHeader date={date} setDateBack={setDateBack} setDateNext={setDateNext} refreshing={diary.refreshing}/>
                <EntriesListView data={diary.data} loading={diary.loading} />
            </View>
            <View>
                <CalendarPicker isVisible={calendarVisible} onDayPress={onCalendarDayPress} onClose={closeCalendar}/>
                <RevealingMenu list={list} isVisible={modalOpened} toggleModal={toggleModal} />
            </View>
        </ScreenContainer>
    )
}


const mapStateToProps = state => {
    return {
        diary: state.diary,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEntries: date => dispatch(getEntriesForDate(date)),
        refreshEntries: date => dispatch(refreshEntriesForDate(date))
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        flex: 1, 
    },
    row: {
        flexDirection: 'row',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MainDiaryScreen)
