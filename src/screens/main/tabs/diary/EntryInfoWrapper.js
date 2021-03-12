import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { colors } from '../../../../colors'

const EntryInfoWrapper = ({entry}) => {

    return (
        <View style={{flexDirection: 'row', height: '100%', }}>
            <View style={{flex: 2,  justifyContent: 'center',  }}>
                <View style={{flexDirection: 'row', paddingLeft: '8%',}}>

                {
                entry.type === 'ENTRY_SLEEP'
                ?
                <>
                    <Avatar size={40}
                            rounded
                            icon={{name: 'bedtime', type: 'material', color: 'black', size: 35}}
                            overlayContainerStyle={{height: 75, backgroundColor: colors.offwhite}}/>
                    <Text style={{alignSelf: 'center', color: colors.offwhite, fontSize: 12, paddingTop: 5, marginLeft: 10, fontStyle: 'italic'}}>SLEEP</Text>
                </>
                :
                <>
                    <Avatar size={40}
                            rounded
                            icon={{name: 'local-restaurant', type: 'material', color: 'black', size: 35}}
                            overlayContainerStyle={{height: 75, backgroundColor: colors.offwhite}}/>
                    <Text style={{alignSelf: 'center', fontSize: 12, paddingTop: 5, marginLeft: 10, fontStyle: 'italic'}}>NUTRITION</Text>
                </>
                }
                </View> 
            </View>
            <View style={{flex: 2, borderWidth: 0, justifyContent: 'center', alignItems: 'center', }}>
                {
                entry.type === 'ENTRY_SLEEP'
                ?
                <>
                    <View style={{flexDirection: 'row', }}>
                        <Icon type='material' name='access-time' size={20}/>
                        <Text style={{paddingTop: 0, paddingLeft: 3, fontSize: 15,}}>{entry.duration} hours</Text>
                    </View>
                    <View style={{flexDirection: 'row', }}>
                        <Text style={{fontStyle: 'italic'}}>at {new Date(entry.timestamp).toTimeString().slice(0, -12)}</Text>
                    </View>
                </>
                :
                <>
                    <View style={{flexDirection: 'row', }}>
                        <Icon type='material-community' name='fire' size={20} style={{paddingTop: 2}}/>
                        <Text style={{paddingTop: 2, paddingLeft: 2, fontSize: 15,}}>{entry.calories} calories</Text>
                    </View>
                    <View style={{flexDirection: 'row', }}>
                        <Text style={{paddingTop: 2, paddingLeft: 2, fontSize: 12,}}>{entry.protein} p</Text>
                        <Text style={{paddingTop: 2, paddingLeft: 2, fontSize: 12,}}>{entry.carbs} c</Text>
                        <Text style={{paddingTop: 2, paddingLeft: 2, fontSize: 12,}}>{entry.fats} f</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontStyle: 'italic'}}>at {new Date(entry.timestamp).toTimeString().slice(0, -12)}</Text>
                    </View>
                </>
                }
            </View>
        </View>
    )
}

export default EntryInfoWrapper