import React, { useState, useRef } from 'react'
import { TouchableWithoutFeedback, Easing, View, Text } from 'react-native'
import { colors } from '../colors';
import * as Animatable from 'react-native-animatable'
import { ListItem, BottomSheet, Avatar} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { useNavigation } from '@react-navigation/native';


const RevealingMenu = ({isVisible, list, toggleModal, }) => {

    const navigation = useNavigation()

    const onPressHandle = screenName => {
        navigation.navigate(screenName)
        toggleModal()
    }

    return (
        <BottomSheet isVisible={isVisible}
                     containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
            {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={() => onPressHandle(l?.screenName)}>
                {l.icon && <Avatar size={40} containerStyle={{marginTop: -10, marginBottom: -10, marginRight: -10}} icon={l.icon} rounded /> }
                <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            ))}
            <ListItem containerStyle={{backgroundColor: '#F44336'}} onPress={toggleModal}>
                <ListItem.Content>
                    <ListItem.Title style={{color : 'white'}}>Cancel</ListItem.Title>
                </ListItem.Content>
            </ListItem>
      </BottomSheet>
    )

}

export default RevealingMenu

const styles = {
    container: {
        height: 100,
        width: 50,
        borderRadius: 10,
        backgroundColor: colors.offwhite
    }
}