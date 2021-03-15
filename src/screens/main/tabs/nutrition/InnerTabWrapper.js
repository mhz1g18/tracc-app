import React, { useContext } from 'react'
import { View,  Text, Pressable, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { colors } from '../../../../colors'
import ExpandableCard from '../../../../components/ExpandableCard'
import SwipeableFlatList from 'react-native-swipeable-list'
import { ScrollView } from 'react-native'
import { TabContext } from './TabContext'
import { FlatList } from 'react-native'

const InnerTabWrapper = ({items, loading, onRefresh, onItemDelete}) => {

  const onRefreshHandler = () => {
    onRefresh()
  }
    
return (
        <View style={styles.container}>
        {loading ?
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size='large' color={colors.smokyblack}/>
            </View>
        :
        <FlatList data={items} contentContainerStyle={styles.listContent}
                  keyExtractor={(item, idx) => `${item?.id}-${idx}`} 
                  renderItem={({item}) => item && <ExpandableCard onDelete={onItemDelete} item={item}/>}
                  onRefresh={onRefreshHandler}
                  refreshing={false} />
        }
        </View>
    )
}

export default InnerTabWrapper

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingWrapper: {
    height: height, 
    alignItems: 'center', 
    paddingTop: 50, 
  },
  listContent: {
    paddingBottom: 75
  }
});