import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenContainer from '../../../../components/ScreenContainer'

const MainNutrtionScreen = props => {
    console.log('rendering main nutrition screen');
    return (
        <ScreenContainer {...props}>
            <Text>haha</Text>
        </ScreenContainer>
    )
}

export default MainNutrtionScreen