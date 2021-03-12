import React, { useEffect, useState, useCallback, useReducer, useRef, useContext } from 'react'
import { View, RefreshControl, Dimensions } from 'react-native'
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
import { getEntriesForDate } from '../../../../redux/actions/diaryActions'
import { connect } from 'react-redux'


const list = [
    { title: 'What would you like to add?'},
    { title: 'Nutrition', screenName: 'Nutrition', icon: {name: 'local-restaurant', type: 'material', color: 'black'} },
    { title: 'Sleep', screenName: 'Sleep',  icon: {name: 'bedtime', type: 'material', color: 'black'}},
    { title: 'Activity', onPress: () => console.log('hahahah'), icon: { name: 'weight-lifter', type: 'material-community', color: 'black'} }
  ];

const initialState = {
    data: [],
    loading: true,
    error: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_ENTRIES':
            return {
                ...state,
                loading: true,
            }
        case 'LOAD_ENTRIES_ERROR':
            return {
                ...state,
                data: [],
                error: action.paylad
            }
        case 'LOAD_ENTRIES_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case 'DELETE_ENTRY':
            return {
                ...state,
                data: state.data.filter(entry => entry.id != action.payload)
            }
        case 'ADD_ENTRY':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        default:
            throw new Error('undefineda ction' + action.type)
    }
  }

const RightHeaderComponent = ({onPressCalendar, onPressAddEntry, }) => {
    return (
        <View style={{flexDirection: 'row', }}>
            <Icon containerStyle={{paddingRight: 10,}} name='plus' type='antdesign' color='#fff' onPress={onPressAddEntry}/>
            <Icon name='calendar' type='antdesign' color='#fff' onPress={onPressCalendar}/>
        </View>
    )
}
  
const MainDiaryScreen = ({fetchEntries, diary, navigation, ...props}) => {

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
                         headerBackgroundColor={colors.sonicsilver}  
                   /*       refreshControl={<RefreshControl onRefresh={fetchData}/>} */
                         {...props}>
            <View style={{flexDirection: 'column', flex: 1, paddingBottom: 50}}>
                <DiaryHeader date={date} setDateBack={setDateBack} setDateNext={setDateNext}/>
                <EntriesListView data={diary.data} loading={diary.loading} navigation={navigation}/>
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
        fetchEntries: date => dispatch(getEntriesForDate(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDiaryScreen)
