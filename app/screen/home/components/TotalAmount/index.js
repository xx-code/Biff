import React from 'react';
import { View,
         Text } from 'react-native';
import { AddButton } from '../../../../components/button';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onClickAdd function
 * @param amount number 
 */
const TotalAmount = props => {

    const { 
            style,
            onClickAdd,
            amount } = props;

    return(
        <View style = {[style, styles.totalAmount]}>
            <Text style = {styles.title}>Total Balance</Text>
            <View style = {styles.boxInfo}>
               <Text style = {styles.amount}>{amount}</Text>
               <AddButton
                    style = {styles.addButton}
                    onPress = {onClickAdd} 
               /> 
            </View>
        </View>
    )
}

export default TotalAmount