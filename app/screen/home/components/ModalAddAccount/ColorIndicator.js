import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

/**
 * 
 * @param color string
 * @param active boolean
 * @param select funtion
 */
const ColorIndicator = props => {
    const { color,
            active,
            select } = props;
    
    return(
        <TouchableOpacity
            style = {[active ? styles.selectedColor : styles.unSelectedColor, {backgroundColor: color}]} 
            onPress = {select}>
        </TouchableOpacity>
    )
}

export default ColorIndicator