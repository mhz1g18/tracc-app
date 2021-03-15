import React from 'react'
import {  StyleSheet } from 'react-native'
import { ListItem, BottomSheet, Avatar} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';


const RevealingMenu = ({isVisible, list, toggleModal, }) => {

    const navigation = useNavigation()

    const onPressHandle = (screenName, screenParams) => {
        if(screenParams) {
            navigation.navigate(screenName, screenParams)
        } else {
            navigation.navigate(screenName)
        }
        toggleModal()
    }

    return (
        <BottomSheet isVisible={isVisible}
                     containerStyle={styles.wrapper}>
            {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={() => onPressHandle(l?.screenName, l?.screenParams)}>
                {l.icon && <Avatar size={40} containerStyle={styles.avatarContainer} icon={l.icon} rounded /> }
                <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            ))}
            <ListItem containerStyle={styles.cancelButton} onPress={toggleModal}>
                <ListItem.Content>
                    <ListItem.Title style={styles.cancelButtonTitle}>Cancel</ListItem.Title>
                </ListItem.Content>
            </ListItem>
      </BottomSheet>
    )

}

const styles = StyleSheet.create({
    wrapper: { 
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' 
    },
    cancelButtonTitle: {
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#F44336',
    },
    avatarContainer: {
        marginTop: -10, 
        marginBottom: -10, 
        marginRight: -10
    },
})

export default RevealingMenu