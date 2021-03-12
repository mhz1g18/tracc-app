import React from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import BarChart from '../../components/BarChart';
import ScreenContainer from '../../components/ScreenContainer';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function* yLabel() {
    yield* [2, '', 10];
  }

const today = new Date()

const data = [
    {
        day: new Date(today.setDate(today.getDate() - 6)),
        duration: 8,
    },
    {
        day: new Date(today.setDate(today.getDate() - 5)),
        duration: 6,
    },
    {
        day: new Date(today.setDate(today.getDate() - 4)),
        duration: 7.5,
    },
    {
        day: new Date(today.setDate(today.getDate() - 3)),
        duration: 8,
    },
    {
        day: new Date(today.setDate(today.getDate() - 2)),
        duration: 9,
    },
    {
        day: new Date(today.setDate(today.getDate() - 1)),
        duration: 8,
    },
    {
        day: new Date(today),
        duration: 8,
    },

    
]

const StatsScreen = ({...props}) => {

    return (
        <ScreenContainer headerBackgroundColor={'#13115c'} {...props}>
            <ScrollView showsVerticalScrollIndicator={true}  style={{flex: 1,}}>
                    <View style={{flex: 1, height: Dimensions.get('window').height * 0.4,}}>
                        <BarChart  data={data} legend={'hours per day'}/>
                    </View>
                    <View >
                    {
                        data.map((item, i) => (
                            <View style={{flexDirection: 'column', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#dbdbdb', backgroundColor: 'white'}} key={i}>
                                <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 4, paddingBottom: 4, backgroundColor: '#13115c'}}>
                                    <Text style={{color: 'white',}}>{item.day.toDateString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop  : 10, paddingBottom: 10,}}>
                                    <Text>{item.duration} hours</Text>
                                </View>
                            </View>
                        ))
                    }
                    </View>
            </ScrollView>
        </ScreenContainer>
    )

}

export default StatsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    chart: {
      height: '100%',
      width: '100%',
    }
  });