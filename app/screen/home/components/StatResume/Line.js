import React from 'react';
import { View,
         Text } from 'react-native';
import { CirclePourcentBar } from '../../../../components/pourcentBar';
import styles from './styles';

/**
 * 
 * @param style object
 * @param label string
 * @param total number
 * @param acheived number 
 * @param color color string
 */
const Line = props => {

    const { style,
            label,
            total,
            acheived,
            color } = props;

    let pourc = (acheived * 100) / total;

    return(
        <View style = {style}>
            <View style = {styles.labelContainer}>
                <Text style = {styles.label} >{label}</Text>
                <Text>{`${acheived}/${total}`}</Text>
            </View>
            <CirclePourcentBar 
                pourcentage = {pourc}
                color  = {color}
            />
        </View>
    )
}

export default Line