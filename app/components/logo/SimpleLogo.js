import React from 'react';
import { View,
         Image,
         Text } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object 
 */
const SimpleLogo = props => {

    const { style } = props;

    return(
        <View style = {style}>
            <View style = {styles.simpleLogo}>
                <View style = {styles.logoContent}>
                    <Image
                        source = {require('../../image/logo.png')} /> 
                    <Text style = {styles.simpleLogoText}>Biff...</Text>
                </View>
                <Text style = {styles.simpleLogoLabel}>Better control of your finances</Text>
            </View>
            
        </View>
    )
}

export default SimpleLogo