import React from 'react'
import { View, Dimensions  } from 'react-native'
import { Avatar,  } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import * as Animatable from 'react-native-animatable'
import EntryInfoWrapper from './EntryInfoWrapper'
import { useNavigation } from '@react-navigation/core'

const SCREEN_WIDTH = Dimensions.get('window').width

const cardColors = {
    'ENTRY_SLEEP' : ['#3680ff', '#174a9c'],
    'ENTRY_NUTRITION':  ['#FF9800', '#F44336'],
}

const cardScreens = {
    'ENTRY_SLEEP' : 'Sleep',
    'ENTRY_NUTRITION' : 'Nutrition',
}

const EntryTile = ({entry,}) => {  

    const GRADIENT_COLORS = cardColors[entry.type]
    const navigation = useNavigation()

    const onPressHandler = () => { 
        const screenName = cardScreens[entry.type]

        navigation.navigate(screenName, {
            entry: entry,
        })
    }

    return (
            <Animatable.View animation='bounceIn' 
                             duration={1000} 
                             easing='ease-in-out'
                         /*     delay={delay * 0}  */
                             useNativeDriver={true}>
                <TouchableScale onPress={onPressHandler} activeScale={1.06} style={{marginTop: 5, marginBottom: 5,}}  friction={80} tension={90}>
                    <LinearGradient style={{height: 65, width: SCREEN_WIDTH * 0.85, borderRadius: 6,}} colors={GRADIENT_COLORS} start={{x: 1, y: 0}} end={{ x: 0.2, y: 0 }}>
                        <EntryInfoWrapper entry={entry}/>
                    </LinearGradient>
                </TouchableScale>
            </Animatable.View>
    )
}


export default EntryTile