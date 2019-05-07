import React from 'react';
import { TouchableOpacity,
         View,
         Image } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object
 * @param img url 
 * @param onPress function 
 */
const ImgTouch = props => {

    const { style,
            img, 
            onPress } = props;

    return(
        <TouchableOpacity 
            style = {style}
            onPress = {onPress}
        >
            <Image source = {img} style = {styles.imgProfile}/>
        </TouchableOpacity>
    )
}

export default ImgTouch