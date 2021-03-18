import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { colors } from '../../../../colors'
import { convertNumToTime } from '../../../../utils/timeutils'

const EntryInfoWrapper = ({entry}) => {

    return (
        <View style={{...styles.row, height: '100%', }}>
            <View style={styles.leftContainer}>
                <View style={{...styles.row, paddingLeft: '8%',}}>

                {
                entry.type === 'ENTRY_SLEEP'
                ?
                <>
                    <Avatar size={40}
                            rounded
                            icon={{name: 'bedtime', type: 'material', color: 'black', size: 35}}
                            overlayContainerStyle={styles.avatarOverlay}/>
                    <Text style={styles.entryStyle}>SLEEP</Text>
                </>
                :
                entry.type === 'ENTRY_NUTRITION'
                ?
                <>
                    <Avatar size={40}
                            rounded
                            icon={{name: 'local-restaurant', type: 'material', color: 'black', size: 35}}
                            overlayContainerStyle={styles.avatarOverlay}/>
                    <Text style={styles.entryStyle}>NUTRITION</Text>
                </>
                :
                <>
                    <Avatar size={40}
                            rounded
                            icon={{name: 'local-restaurant', type: 'material', color: 'black', size: 35}}
                            overlayContainerStyle={styles.avatarOverlay}/>
                    <Text style={styles.entryStyle}>WORKOUTZ</Text>
                </>
                }
                </View> 
            </View>
            <View style={styles.rightContainer}>
                {console.log(entry)}
                {
                entry.type === 'ENTRY_SLEEP'
                ?
                <>
                    <View style={styles.row}>
                        <Icon type='material' color='black' name='access-time' size={20}/>
                        <Text style={styles.sleepLabel}>{convertNumToTime(entry.duration, true)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.timeStamp}>at {new Date(entry.timestamp).toTimeString().slice(0, -12)}</Text>
                    </View>
                </>
                :
                entry.type === 'ENTRY_NUTRITION'
                ?
                <>
                    <View style={styles.row}>
                        <Icon type='material-community' name='fire' size={20} style={{paddingTop: 2}}/>
                        <Text style={styles.caloriesLabel}>{entry.calories.toFixed(1)} calories</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.nutritionSubLabel}>
                            {entry.protein.toFixed(1)} p 
                            {entry.carbs.toFixed(1)} c
                            {entry.fats.toFixed(1)} f
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.timeStamp}>at {new Date(entry.timestamp).toTimeString().slice(0, -12)}</Text>
                    </View>
                </>
                :
                <>
                    <View style={styles.row}>
                        <Text>{entry.exerciseList?.map(ex => ex.name)}</Text>
                    </View>
                </>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    caloriesLabel: {
        paddingTop: 2, 
        paddingLeft: 2, 
        fontSize: 15,
    },
    nutritionSubLabel: {
        paddingTop: 2,
        paddingLeft: 2,
        fontSize: 12,
    },
    row: {
        flexDirection: 'row'
    },
    avatarOverlay: {
        height: 75, 
        backgroundColor: colors.offwhite,
    },
    leftContainer: {
        flex: 2,  
        justifyContent: 'center', 
    },
    entryStyle: {
        alignSelf: 'center', 
        color: colors.offwhite, 
        fontSize: 12, 
        paddingTop: 5, 
        marginLeft: 10, 
        fontStyle: 'italic',
    },
    rightContainer: {
        flex: 2, 
        borderWidth: 0, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    timeStamp: {
        fontStyle: 'italic',
    },
    sleepLabel: {
        paddingTop: 0,
        paddingLeft: 3, 
        fontSize: 15, 
        color: 'black',
    },


})

export default EntryInfoWrapper