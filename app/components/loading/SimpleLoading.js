import React from 'react';
import { ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from '../../config/colors';  
import { HideView } from '../view';
/**
 * 
 * @param active boolean
 * @param style object
 */
const SimpleLoading = props => {

    const { active,
            style } = props;
    console.log(active)
    return(
        <HideView 
            style = {style}
            hide = {active}>
            <ActivityIndicator
                size = "large"
                color = {PRIMARY_COLOR} 
            />
        </HideView>
    )
}

export default SimpleLoading