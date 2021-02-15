import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../colors'

const GradientButton = props => {
    
    return (
        <TouchableOpacity style={{flex : 1, width: '75%'}}  onPress={props.onPress}>
                    <LinearGradient style={{alignItems: 'center', justifyContent: 'center', height: 50, width: '100%', borderRadius: 45}}
                        colors={props.colors}
                    >
                <Text>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}


export default GradientButton