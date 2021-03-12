import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { colors } from '../../../../colors'

const SCREEN_WIDTH = Dimensions.get('window').width
const GRADIENT_COLORS =  ['#777878', '#525252'] 

const SummaryTile = ({summary, loading}) => {
    
    return (
        <View>
             <TouchableScale activeScale={1.06} style={{marginTop: 5, marginBottom: 5,}}  friction={80} tension={90}>
                    <LinearGradient style={{height: 150, width: SCREEN_WIDTH * 0.85, borderRadius: 15,}} colors={GRADIENT_COLORS} start={{x: 1, y: 0}} end={{ x: 0.2, y: 0 }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name='clipboard-list' size={30} color='black' raised type='font-awesome-5'/>
                            <Text style={{fontSize: 24}}> Today's summary</Text>
                        </View>
                    </LinearGradient>
                    {/* <View style={{borderRadius: 15, height: 200, }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name='clipboard-list' size={30} color='black' raised type='font-awesome-5'/>
                            <Text style={{fontSize: 24}}> Today's summary</Text>
                        </View>
                    </View> */}
                </TouchableScale>
        </View>
    )
}

export default SummaryTile