import React from 'react'
import { Text } from 'react-native'
import { Overlay } from 'react-native-elements'

const style = { 
    width: '100%',
    height: '100%',
}

const AddEntryModal = props => {

    return (
        <Overlay style={style} isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
            <Text>modal</Text>
        </Overlay> 
    )
}

export default AddEntryModal