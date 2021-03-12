import React, { useEffect } from 'react'
import { View, Text, Platform, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { toggleCardStatus } from '../../../../redux/actions/screenActions'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

export const CARD_WIDTH = Dimensions.get('window').width * 0.9
export const CARD_HEIGHT = 75

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.4,
            },
            android: {
                elevation: 0,
            },
        } )
    },
    leftColumn: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingLeft: 10, 
    },
    rightColumn: {
        flex: 4, 
        flexDirection: 'column', 
        paddingLeft: 12,
        paddingBottom: 10, 
        justifyContent:'center',  
    },
    label: {
        fontSize: 16, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light',
    },
    subLabel: {
        fontSize: 14, 
        fontFamily: 'sans-serif-light'
    }

})



const HomeScreenCard = ({card: {icon, color, isActive, ...card}, editMode, toggleStatus}) => {


    /* useEffect(() => {
        console.log(`edit mode in card is ${editMode}`);
    }, [editMode]) */

   /*  useEffect(() => {
        console.log(card.isActive);
    }, [card]) */

    const navigation = useNavigation()

    const pressHandler = () => {
        navigation.navigate(card.screenName)
    }

    return (
        <TouchableOpacity onPress={pressHandler}>
            <LinearGradient style={styles.container} colors={card.colors} start={{x: 1, y: 0}} end={{ x: 0.2, y: 0 }}>
                <View style={styles.leftColumn}>
                    {
                    icon && 
                    <ProgressCircle percent={30}
                                    radius={26}
                                    borderWidth={4}
                                    color={icon.progressColor}
                                    shadowColor={icon.shadowColor || "#999"}
                                    bgColor="#fff">
                        <Icon name={icon.name}  type={icon.type} size={icon.size} color={icon.color}/>
                    </ProgressCircle>
                    }
                </View>
                <View style={styles.rightColumn}>

                    <Text style={[styles.label, card.labelStyle,] }>{card.label(8, 15  )}</Text>
                    <Text style={styles.subLabel}>{card.subLabel(12)}</Text>
                </View>

                {
                false && 
                <View style={{position: 'absolute', right: 5, bottom: 5}}>
                    <Icon name='cancel' type='material' color='black' onPress={() => console.log('x')}/>
                </View>}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const mapStateToProps = state => {
    return {
        editMode: state.screenState.editMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleStatus: (idx) => {
            console.log('before calling dispatch')
            dispatch(toggleCardStatus(idx))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenCard) 