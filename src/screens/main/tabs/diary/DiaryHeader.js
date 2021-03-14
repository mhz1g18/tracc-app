import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { colors } from '../../../../colors'

const getFormattedDate = date => {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)

    if (date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()) {
        return 'Today'
    } else if(date.getDate() == yesterday.getDate() &&
                date.getMonth() == yesterday.getMonth() &&
                date.getFullYear() == yesterday.getFullYear()) {
        return 'Yesterday'
    } else {
        let dateString = date.toDateString()
        let output = (dateString.slice(0, 3) + ', ' + dateString.slice(4)).slice(0, -4)
            
        return output
    }

}

const DiaryHeader = ({date, setDateBack, setDateNext, showBorder}) => {

    const [dateLabel, setDateLabel] = useState()

    useEffect(() => {
        setDateLabel(getFormattedDate(date))
    }, [date])

    console.log(showBorder);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity>
                <Icon name='arrowleft' type='antdesign' color='black' raised size={20} onPress={setDateBack}/>
            </TouchableOpacity>
            <View style={styles.labelWrapper}>
                <Text h4 h4Style={styles.label}>{dateLabel}</Text>
            </View>
            <TouchableOpacity>
                <Icon name='arrowright'  type='antdesign' color='black' raised size={20} onPress={setDateNext} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',  
        paddingLeft: 35,
        paddingRight: 35,
    },
    label: {
        fontSize: 22, 
        color: colors.smokyblack,
    },
    labelWrapper: {
        flex: 3, justifyContent: 'center', alignItems: 'center'
    },
})

export default DiaryHeader