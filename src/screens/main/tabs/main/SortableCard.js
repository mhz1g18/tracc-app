import React from 'react'
import { View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import HomeScreenCard, { CARD_HEIGHT, CARD_WIDTH } from './HomeScreenCard'


const SortableCard = ({ card, index, offsets }) => {

    const translateX = offsets[index].x
    const translateY = offsets[index].y


    return (
        <PanGestureHandler>
            <Animated.View style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: CARD_WIDTH,
                                height: CARD_HEIGHT,
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [ { translateX }, { translateY }]
                            }}>
            <HomeScreenCard {...{card}}/>
            </Animated.View>
        </PanGestureHandler>
        
    )
}

export default SortableCard