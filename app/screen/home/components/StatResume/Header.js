import React from 'react';
import { View,
         Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconButton } from '../../../../components/button';
import styles from './styles';
import { TEXT_PRIMARY_COLOR } from '../../../../config/colors';

/**
 * 
 * @param style object
 * @param icon string 
 * @param color color string of icon
 * @param title string
 * @param handleMore function  
 */
const Header = props => {

    const { style,
            icon, 
            color,
            title,
            handleMore } = props;

    return(
        <View style = {[style, styles.headerTop]}>
            <View style = {styles.icon}>
                <Icon
                    name = {icon}
                    size = {50}
                    color = {color}  
                />
                <Text style = {styles.iconLabel}>{title}</Text>
            </View>
            
            <IconButton
                onPress = {handleMore}
                icon = "md-more" 
                color = {TEXT_PRIMARY_COLOR}
                size = {30}
            />
        </View>
    )
}

export default Header