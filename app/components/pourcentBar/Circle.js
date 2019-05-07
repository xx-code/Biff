import React from 'react';
import {View} from 'react-native';
import styles from './styles';


/**
 * 
 * @param style object
 * @param pourcentage number 
 * @param color color in background of bar 
 */
const Circle = props => {

    const { style,
            pourcentage,
            color } = props;

    return(
        <View style = {style}>
            <View style= {styles.circleBar}>
                <View style = {{...styles.insideCircle, width: `${pourcentage}%`, backgroundColor: color}} ></View>
            </View>
        </View>
    )
}

export default Circle