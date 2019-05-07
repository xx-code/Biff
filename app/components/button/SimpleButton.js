import React from 'react';
import { View,
         TouchableOpacity,
         Text } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function
 * @param label string 
 */
const SimpleButton = props => {

    const { style,
            onPress,
            label } = props;

    return(
        <View style = {style}>
           <TouchableOpacity
                style = {styles.simpleButton}
                onPress = {onPress}>
                <Text style = {styles.simpleButtonText}>{label}</Text>
            </TouchableOpacity> 
        </View>
        
    )
}

export default SimpleButton