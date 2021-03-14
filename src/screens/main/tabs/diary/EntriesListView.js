import React, { useState, useEffect, useCallback, createRef } from 'react'
import { ScrollView, View, RefreshControl, Text, StyleSheet } from 'react-native'
import MaskedViewWrapper from '../../../../components/MaskedViewWrapper';
import ListGradient from '../../../../components/ListGradient';
import EntryTile from './EntryTile';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../../colors';
import SummaryTile from './SummaryTile';
import Loader from 'react-native-three-dots-loader'
import diaryReducer from '../../../../redux/reducers/diaryReducer';


const renderItem = ({ item, index}) => {
    return (
        <EntryTile entry={item} key={item.id} delay={index}/>
    )
}


const EntriesListView = ({data, loading,}) => {

    
    return (
       <ScrollView>
            {loading 
            ?
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size='large' color={colors.smokyblack}/>
            </View>
            :
            data.length === 0 ?
            <View style={styles.emptyWrapper}>
                <Text style={{fontSize: 24, color: colors.smokyblack}}> No entries today... :(</Text>
            </View>
            :
            <View style={styles.wrapper}>
                {data.map(entry => entry && <EntryTile entry={entry} key={entry.id} />)}
            </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loadingWrapper : {
        flex: 1, 
        marginTop: '20%' 
    },
    emptyWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 50,
    },
    wrapper: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
})

export default EntriesListView

