import React, { useContext } from 'react'
import { View,  Text, Pressable, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { colors } from '../../../../colors'
import ExpandableCard from '../../../../components/ExpandableCard'
import SwipeableFlatList from 'react-native-swipeable-list'
import { ScrollView } from 'react-native'
import { TabContext } from './TabContext'
import { FlatList } from 'react-native'

const InnerTabWrapper = ({items, loading, onRefresh, onItemDelete}) => {

  const { dispatch } = useContext(TabContext)

  const onRefreshHandler = () => {
    onRefresh()
  }
    
return (
        <View style={{flex : 1, }}>
        {loading ?
            <View style={{height: Dimensions.get('window').height, alignItems: 'center', paddingTop: 50, }}>
                <ActivityIndicator size='large' color={colors.smokyblack}/>
            </View>
        :
        <FlatList data={items} contentContainerStyle={{paddingBottom: 75}}
                  keyExtractor={(item, idx) => `${item?.id}-${idx}`} 
                  renderItem={({item}) => item && <ExpandableCard onDelete={onItemDelete} item={item}/>}
                  onRefresh={onRefreshHandler}
                  refreshing={false} />
        }
        </View>
    )
}

export default InnerTabWrapper

const darkColors = {
    background: '#121212',
    primary: '#BB86FC',
    primary2: '#3700b3',
    secondary: '#03DAC6',
    onBackground: '#FFFFFF',
    error: '#CF6679',
  };
  
  const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
  };

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
    },
    headerContainer: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
    },
    headerText: {
      fontSize: 30,
      fontWeight: '800',
      color: darkColors.onBackground,
      opacity: colorEmphasis.high,
    },
    item: {
      backgroundColor: '#121212',
      height: 80,
      flexDirection: 'row',
      padding: 10,
    },
    messageContainer: {
      backgroundColor: darkColors.backgroundColor,
      maxWidth: 300,
    },
    name: {
      fontSize: 16,
      color: darkColors.primary,
      opacity: colorEmphasis.high,
      fontWeight: '800',
    },
    subject: {
      fontSize: 14,
      color: darkColors.onBackground,
      opacity: colorEmphasis.high,
      fontWeight: 'bold',
      textShadowColor: darkColors.secondary,
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 4,
    },
    text: {
      fontSize: 10,
      color: darkColors.onBackground,
      opacity: colorEmphasis.medium,
    },
    avatar: {
      width: 40,
      height: 40,
      backgroundColor: darkColors.onBackground,
      opacity: colorEmphasis.high,
      borderColor: darkColors.primary,
      borderWidth: 1,
      borderRadius: 20,
      marginRight: 7,
      alignSelf: 'center',
      shadowColor: darkColors.secondary,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: colorEmphasis.high,
    },
    itemSeparator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: darkColors.onBackground,
      opacity: colorEmphasis.medium,
    },
    qaContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      opacity: colorEmphasis.high,
    },
    button1Text: {
      color: darkColors.primary,
    },
    button2Text: {
      color: darkColors.secondary,
    },
    button3Text: {
      color: darkColors.error,
    },
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: darkColors.backgroundColor,
    },
  });