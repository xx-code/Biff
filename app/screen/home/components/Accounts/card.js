import React from 'react';
import { TouchableOpacity,
         Text,
         View } from 'react-native';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function
 * @param name string
 * @param amount number
 * @param devise string
 * @param color string-color  
 */
const Card = props => {

    const { style,
            onPress,
            onLongPress,
            devise,
            account } = props;

    return(
        <TouchableOpacity
            style = {[style, {...styles.card, backgroundColor: account.color}]}
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