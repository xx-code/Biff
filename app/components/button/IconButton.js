import React from 'react';
import { View,
         TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function
 * @param icon string
 * @param size number
 * @param color colorConstant 
 */
const IconButton = props => {

    const { style,
            onPress,
            icon,
            size,
            color } = props;

    return(
        <View style = {style}>
           <TouchableOpacity
                style = {styles.iconButton}
                onPress = {onPress}>
                <Icon
                    size = {size} 
                    name = {icon}
                    color = {color}
                />
            </TouchableOpacity> 
        </View>
        
    )
}

export default IconButton