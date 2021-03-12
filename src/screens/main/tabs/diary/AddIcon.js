import React, { useRef } from 'react'
import { Animated, Easing, View, } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

const AnimatedModalSwitchIcon = props => {
    
    const buttonPressHandler = () => {
        props.onPress()
    }
       
    return (
        <TouchableScale activeScale={1.1} friction={56} tension={45}>
            <TouchableWithoutFeedback onPress={buttonPressHandler}>
                <Icon name='plus' type='antdesign' raised  size={18} /* onPress={setDateBack} *//>
            </TouchableWithoutFeedback>
        </TouchableScale>
    )
}

export default AnimatedModalSwitchIcon