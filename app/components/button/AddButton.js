import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR } from '../../config/colors';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function 
 */
const AddButton = props => {

    const { style,
            onPress } = props;

    return(
        <TouchableOpacity 
            style = {[style, styles.addButton]}
            onPress = {onPress}
            >
            <Icon 
                name = "md-add"
                color = {PRIMARY_COLOR}
                size = {35}
            />
        </TouchableOpacity>
    )
}

export default AddButton