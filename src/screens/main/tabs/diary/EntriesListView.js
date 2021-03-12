import React, { useState, useEffect, useCallback, createRef } from 'react'
import { ScrollView, View, RefreshControl, Text } from 'react-native'
import MaskedViewWrapper from '../../../../components/MaskedViewWrapper';
import ListGradient from '../../../../components/ListGradient';
import EntryTile from './EntryTile';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../../colors';
import SummaryTile from './SummaryTile';
import Loader from 'react-native-three-dots-loader'


const renderItem = ({ item, index}) => {
    return (
        <EntryTile entry={item} key={item.id} delay={index}/>
    )
}


const EntriesListView = ({data, loading, onRefresh, navigation}) => {


    return (
       <ScrollView style={{borderWidth: 0}}>
            {loading 
            ?
            <View style={{flex: 1, marginTop: '20%' }}>
                <ActivityIndicator size='large' color={colors.smokyblack}/>
                {/* <Loader /> */}
            </View>
            :
            data.length === 0 ?
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
                <Text style={{fontSize: 24, color: colors.smokyblack}}> No entries today... :(</Text>
            </View>
            :
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {data.map(entry => <EntryTile entry={entry} key={entry.id} navigation={navigation} />)}

            </View>
            }
        </ScrollView>
    )
}

export default EntriesListView

