import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Input, } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { units } from '../../../../../utils/units'
import TagInput from 'react-native-tags-input'
import { setNutritionForm } from '../../../../../redux/actions/nutritionActions';
import { connect } from 'react-redux';

const SupplementForm = ({nutritionForm, setForm, }) => { 
    const [tags, setTags] = useState({tag: '', tagsArray: nutritionForm?.categories || []})

    const updateCategories = category => {
        setTags(category)
    }

    useEffect(() => {
        setForm({...nutritionForm, categories: tags.tagsArray})
    }, [tags.tagsArray.length])

    const nameInputHandler = text => {
        setForm({...nutritionForm, name: text})
    }

    const unitInputHandler = item => {
        setForm({...nutritionForm, unit: item.value})
    }

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Input placeholder='Supplement name' 
                inputStyle={styles.inputStyle}  
                value={nutritionForm?.name} 
                onChangeText={nameInputHandler}
                containerStyle={styles.inputContainer} 
                inputContainerStyle={styles.inputContainerStyle}  />
            
            <Text style={styles.label}>Measurement Unit</Text>

            <DropDownPicker items={units}
                            defaultValue={nutritionForm?.unit || 'UNIT_MG'}
                            containerStyle={{height: 50,  width: '100%'}}
                            style={{backgroundColor: '#fafafa',   borderBottomWidth: StyleSheet.hairlineWidth}}
                            itemStyle={{
                                paddingLeft: 15, 
                                justifyContent: 'flex-start'
                            }}
                            placeholder='Measurement Unit'
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={unitInputHandler}/>

            <Text style={styles.label}>Categories</Text>

            <TagInput updateState={updateCategories} 
                      tags={tags}
                      inputStyle={styles.inputStyle}
                      tagStyle={{backgroundColor: 'white', borderWidth: StyleSheet.hairlineWidth}}
                      containerStyle={{paddingHorizontal: 0}}
                      inputContainerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5, opacity: 0.6}}/>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        nutritionForm: state.nutrition.form,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setForm: form => dispatch(setNutritionForm(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplementForm)


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    label: {
        fontSize: 17,
        padding: 15,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    pickerStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#fafafa',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    inputStyle: {
        fontSize:17, 
        height: 40, 
        borderBottomWidth: 0,
        width: '100%',

    },
    inputContainer: {
        paddingHorizontal: 0,
    },
    inputContainerStyle: {
        height: 60,
        paddingHorizontal: 0,
        borderColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white', 
        opacity: 0.6, 
        borderRadius: 0, 
        paddingLeft: 10,
        marginBottom: -12,
        alignSelf: 'center',
        width: '100%',
    },
})