import React from 'react';
import { TouchableOpacity,
         Text,
         View } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object
 * @param index num
 * @param onPress function
 * @param name string
 * @param amount number
 * @param devise string
 * @param color string-color  
 */
const Card = props => {

    const { index,
            style,
            onPress,
            onLongPress,
            devise,
            account } = props;

    let color = index !== 0 ? "#cfd8dc" : account.color;     

    return(
        <TouchableOpacity
            style = {[style, {...styles.card, backgroundColor: color}]}
            onPress = {onPress}
            onLongPress = {onLongPress}
        >
            <Text style = {styles.accountName}>{account.name}</Text>
            <Text style = {styles.accountAmount}>{account.amount}</Text>
            <View style = {styles.accountDevis}>
                <Text style = {styles.accountAmount}>{devise}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card