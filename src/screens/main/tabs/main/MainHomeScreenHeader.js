import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import ProgressCircle from 'react-native-progress-circle'
import { colors } from '../../../../colors'
import { ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const items = [
    {
        label: 'steps',
        icon: <FontAwesome name='shoe-prints' size={24} color={colors.darkorange} />,
    },
    {
        label: 'calories',
        icon: <MaterialCommunity name='fire' size={39} color={colors.darkorange} />,
        progressColor: '#c23b22',
    },
    {
        label: 'activities',
        icon: <MaterialCommunity name='weight-lifter' size={40} color='#383428' />,
        progressColor: '#302f29',
    },
    {
        label: 'hours',
        icon: <Material name='bedtime' size={32} color='#779ecb' />,
        progressColor: '#3e4772'
    }
]

const MainHomeScreenHeader = props => {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
        {items.map((x, idx) => {
            return (
                <View style={{flexDirection: 'column',}} key={idx}>
                        {
                            isLoading ?
                            <View style={{flexDirection: 'row', /* borderWidth: 1, justifyContent: 'center' */}}>
                                <ActivityIndicator size={50} color={colors.darkorange} />
                            </View>
                            :
                            <>
                            <View style={{flexDirection: 'row',}}>
                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                                    <ProgressCircle percent={30}
                                                    radius={30}
                                                    borderWidth={3}
                                                    color={x.progressColor || colors.peach}
                                                    shadowColor='white'
                                                    bgColor="#fff">
                                        {x.icon}
                                    </ProgressCircle>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>265</Text> 
                                        <Text> {x.label}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{flexDirection: 'row',  paddingTop: 3,}}>
                                <Text style={{fontWeight: 'bold'}}>265</Text> 
                                <Text> {x.label}</Text>
                            </View> */}
                            </>
                        }
                    </View>
            )
        })}</>
    )
}

export default MainHomeScreenHeader