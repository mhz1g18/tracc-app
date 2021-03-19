import React from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { colors } from '../../../../colors'
import ExpandableCard from '../../../../components/ExpandableCard'
import { FlatList } from 'react-native'

const InnerTabWrapper = ({items, loading, refreshing, onRefresh, cardEditable}) => {

  const onRefreshHandler = () => {
    if(onRefresh) {
      onRefresh()
    }
  }

  return (
      <View style={styles.container}>
        {
          loading ?
          <View style={styles.loadingWrapper}>
              <ActivityIndicator size='large' color={colors.smokyblack}/>
          </View>
          :
          <FlatList data={items} 
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(item, idx) => `${item?.id}-${idx}`} 
                    renderItem={({item}) => item && <ExpandableCard item={item} cardEditable={cardEditable}/>}
                    refreshing={refreshing}
                    onRefresh={onRefreshHandler} />
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