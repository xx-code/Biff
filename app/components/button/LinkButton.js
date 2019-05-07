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
 * @param fontSize number 
 */
const LinkButton = props => {

    const { style,
            onPress,
            label,
            fontSize } = props;

    return(
        <View style = {style}>
           <TouchableOpacity
                style = {styles.linkButton}
                onPress = {onPress}>
                <Text style = {{...styles.linkButtonText, fontSize: fontSize}}>{label}</Text>
            </TouchableOpacity> 
        </View>
        
    )
}

export default LinkButton