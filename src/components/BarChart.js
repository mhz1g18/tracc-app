import React, { useState } from 'react'
import { View, Text, Pressable, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../colors'
import Svg, {Rect, Circle} from 'react-native-svg'

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const getDayFromDayDate = date => {
    console.log(date);
    console.log(date.getDay());
    return days[date.getDay() - 1]
}

const Bar = ({item, height, width, margin, index}) => {

    const [isPressed, setIsPressed] = useState(false)

    const pressInHandler = () => setIsPressed(true)
    const pressOutHandler = () => setIsPressed(false)
    return (

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                { isPressed && <Text style={{color: 'white', fontSize: 17}}>8</Text>}
                <View style={{flexDirection: 'column', opacity: isPressed ? 0.7 : 1,  width: 25, marginLeft: 10, marginRight: 10, height: height, backgroundColor: colors.peach}}>
                    <Pressable style={{height: '100%', width: '100%'}} 
                               onPressIn={pressInHandler}
                               onPressOut={pressOutHandler}/>
                </View>
                           
                {/* <Text style={{color: 'white'}}>{days[item.day.getDay() - 1]}</Text> */}
                <Text style={{color: 'white'}}>{days[index]}</Text>
            </View>
    )
}

const BarChart = ({data, legend}) => {


    return (
        <LinearGradient colors={["#13115c", "#306991"]} style={{flex: 1, }} /* start={{x: 2, y: 1}} */>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                <Text style={{color: 'white', fontSize: 15}}>{legend}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2,  alignItems: 'flex-end', justifyContent: 'center', }}>
                        <View style={{flexDirection: 'column',justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', height: '100%', width: '100%',}}>
                            {
                            data?.map((item, idx) => {
                                return (
                                    <Bar key={idx} index={idx} item={item} height={`${item.duration / 10 * 100}%`}/>
                                )
                            })
                            }
                        </View>
                    </View>
            </View>
        </LinearGradient>

    )
}

export default BarChart