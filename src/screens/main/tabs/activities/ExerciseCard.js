import React from 'react'
import { ListItem } from 'react-native-elements'


const ExerciseCard = ({exercise, onPress}) => {

    return (
        <ListItem onPress={onPress}>
            <ListItem.Content>
                <ListItem.Title>{exercise.name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default ExerciseCard