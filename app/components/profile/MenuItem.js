import React from 'react';
import { View,
         Text,
         TouchableOpacity } from 'react-native';
import styles from './styles'

/**
 * 
 * @param style object
 * @param end boolean
 * @param text string
 * @param onPress function 
 */
const MenuItem = props => {
    
    const { style,
            end, 
            text,
            onPress } = props;

    return(
        <TouchableOpacity 
            style = {[style, styles.menuItem]}
            onPress = {onPress}>
            <Text style = {styles.menuItemText}>{text}</Text>
            <View style = {{...styles.bottomBar, height: end ? 0.4 : 0}} />
        </TouchableOpacity>
    )
}

export default MenuItem