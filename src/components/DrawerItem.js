import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { View } from 'react-native'

const DrawerItem = props => {

    const [isPressed, setIsPressed] = useState(false)

    return (
        <View style={{flex: 1}}>
            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, ]}> 
                <Text>Steps</Text>
            </Pressable>
        </View>

    )
}

export default DrawerItem