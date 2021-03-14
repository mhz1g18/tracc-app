import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { deleteEntryAsync } from '../../../../../redux/actions/diaryActions'


const EntryHeader = ({id, onSubmit, deleteEntry}) => {

    const navigation = useNavigation()

    const onPress = () => {
        deleteEntry()
        navigation.pop()
    }

    return (
        <View style={{flexDirection: 'row', }}>
            <Icon onPress={onSubmit} containerStyle={{marginRight:10}} name='check' type='feather' color='white' size={24}/>
            {id && <Icon onPress={onPress} name='trash-o' type='font-awesome' color='white' size={24}/>}
        </View>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteEntry: () => dispatch(deleteEntryAsync(ownProps.id))
    }
}

export default connect(null, mapDispatchToProps)(EntryHeader)