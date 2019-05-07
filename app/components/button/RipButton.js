import React from 'react';
import { TouchableOpacity,
         Text } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function 
 * @param text string
 */
const RipButton = props => {

    const { style,
            onPress,
            text } = props;

    return(
        <TouchableOpacity 
            style = {[style, styles.ripButton]}
            onPress = {onPress}
            >
            <Text style = {styles.ripText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default RipButton