import React from 'react';
import { TouchableOpacity,
         Text,
         View } from 'react-native';
import styles from './styles';

/**
 * 
 * @param onPress function
 * @param text string
 * @param bottomBar boolean
 */
const Item = props => {
    const { onPress,
            text,
            bottomBar } = props;
    return(
        <React.Fragment>
            <TouchableOpacity
                style = {styles.item}
                onPress = {onPress}>
                <Text style = {styles.textItem}>{text}</Text>
                
            </TouchableOpacity>
            <View style = {bottomBar? styles.bottomBar : {}}/>
        </React.Fragment>
        
    )
}

export default Item