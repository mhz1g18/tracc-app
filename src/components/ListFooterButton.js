import React from 'react'
import { View, StyleSheet} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const icon = {
    name: 'pluscircleo',
    type: 'antdesign',
    color: 'green',
}

const ListFooterButton = ({onPress, buttonTitle}) => {
    return (
        <View style={styles.wrapper}>
            <ListItem containerStyle={styles.listItemContainer} onPress={onPress}>
            <Avatar icon={icon}   />
            <ListItem.Content>
                <ListItem.Title style={styles.listTitleStyle}>{buttonTitle}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
    },
    listItemContainer: {
        backgroundColor: 'white',
        paddingTop: 7,
        paddingBottom: 7,
    },
    listTitleStyle: {
        fontSize: 16,
    }
})

export default ListFooterButton