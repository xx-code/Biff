import React from 'react';
import { View } from 'react-native';

/**
 * 
 * @param hide boolean 
 * @param style object 
 */
const HideView = props => {
    return(
        <View style = {[props.style, {display: props.hide ? 'none' : 'flex'}]}>
            {props.children}
        </View>
    )
}

export default HideView