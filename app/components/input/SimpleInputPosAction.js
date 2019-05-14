import React from 'react';
import { View, 
         TextInput,
         Text,
         TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { SECONDARY_COLOR_HIGHT } from '../../config/colors';


/**
 * 
 * @param style object
 * @param onClickAction function to lauch any action an return a value
 * @param value string
 * @param label string
 * @param name string 
 */
const SimpleInputPosAction = props => {

    const { style,
            onClickAction,
            value,
            label,
            error } = props;

    return(
        <TouchableWithoutFeedback onPress = {onClickAction}>
            <View style = {[style, styles.simpleInput]}>
                <Text style = {styles.simpleInputLabel}>{label}</Text>
                <TextInput
                    style = {styles.simpleInputField}
                    value = {value}
                    underlineColorAndroid = {SECONDARY_COLOR_HIGHT}
                    editable = {false}
                />
                <Text style = {styles.errors}>{error}</Text>
            </View>
        </TouchableWithoutFeedback>
            
    )
}

export default SimpleInputPosAction