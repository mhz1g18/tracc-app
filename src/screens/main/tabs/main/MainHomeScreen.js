import React, {useEffect, useState} from 'react'
import { View, Text, Dimensions } from 'react-native'
import ScreenContainer from '../../../../components/ScreenContainer'
import * as Animatable from 'react-native-animatable'
import MainHomeScreenHeader from './MainHomeScreenHeader'
import { ScrollView } from 'react-native-gesture-handler'
import CardListView from './CardsListView'
import { enterEditMode, exitEditMode, fetchCards } from '../../../../redux/actions/screenActions'
import { connect, useStore } from 'react-redux'
import { cards } from './cards'
import { colors } from '../../../../colors'
import { color } from 'react-native-reanimated'

const SCREEN_WIDTH = Dimensions.get('window').width

const MainHomeScreen = ({...props}) => {

    // set a meal plan card and show next meal - done
    // current weight card - done
    // sleep card - done
    // daily calories consumed so far - done
    // workout goal card
    // next workout card
    
    useEffect(() => {
        setTimeout(() => {
        console.log('heyeyeye');
            
        }, 100);
    })

    return (
        <ScreenContainer headerBackgroundColor={colors.backgroundPurple} {...props} >
            {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, paddingBottom: 15, flexDirection: 'column', }}> */}
                
                <View style={{flexDirection: 'column', flex: 1, paddingBottom: 20, }}>
                    <View style={{flexDirection: 'column', paddingBottom: 25, paddingTop: 10,}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', paddingBottom: 5  }}>
                                <Animatable.Text animation='bounceIn' style={{ paddingTop: 15, fontSize: 33, fontFamily: 'sans-serif-light'}}> 
                                    Good Morning,{/* {'\n'} */} Milko
                                </Animatable.Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',  paddingLeft: 15, paddingRight:15,/*  paddingBottom: 20, paddingTop: 20, */}}>
                                <MainHomeScreenHeader />
                        </View>
                    </View>
                    <CardListView cards={cards} />
                </View>
            {/* </ScrollView> */}
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    screenState: state.screenState,
})

const mapDispatchToProps = dispatch => ({
    enterEditMode: () => dispatch(enterEditMode()),
    exitEditMode: () => dispatch(exitEditMode()),
    loadCards: () => dispatch(fetchCards())
})

//export default connect(mapStateToProps, mapDispatchToProps)(MainHomeScreen)
export default MainHomeScreen