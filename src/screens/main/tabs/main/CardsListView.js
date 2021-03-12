import React, { useState } from 'react'
import {  Pressable, View } from 'react-native'
import HomeScreenCard, { CARD_HEIGHT } from './HomeScreenCard'
import { TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import MainHomeScreenHeader from './MainHomeScreenHeader'
import SortableCard from './SortableCard'
import { Value } from 'react-native-reanimated'

const CardListView = ({ cards, }) => {

    return (
        <View style={{alignItems: 'center'}}>
            {cards.sort((a, b) => (a.isActive === b.isActive)? 0 : a.isActive? -1 : 1)
                  .map((card, index) => <HomeScreenCard key={card.id} {...{card}} />)}
            
        </View>
    )   
}


export default CardListView