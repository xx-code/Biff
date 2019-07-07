import React from 'react';
import { View,
         TouchableOpacity,
         Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import categoryIcon from '../../../../config/categoryIcon';
import styles from './styles';

/**
 * 
 * @param style object
 * @param onPress function
 * @param category string
 * @param description string
 * @param devise string
 * @param amount number
 * @param date string
 * @param showBar boolean 
 */
const Record = props => {


    const { style,
            onPress,
            category,
            description,
            devise,
            amount,
            date,
            showBar } = props;

    const getCategory = categoryIcon.find(cat => cat.key === category)

    return(
        <TouchableOpacity
            style = {style}
            onPress = {onPress} 
        >
            <View style = {styles.record}>
                <Icon
                    style = {styles.icon}
                    name = {getCategory.icon}
                    color = {getCategory.color}
                    size = {50} 
                />
                <View style = {styles.boxRecordInfo}>
                    <Text style = {styles.category}>{getCategory.label}</Text>
                    <Text style = {styles.description}>{description}</Text>
                </View>
                <View style = {styles.boxRecordPrice}>
                    <Text style = {amount > 0 ? styles.amountIncome : styles.amountDepense }>{`${devise} ${amount}`}</Text>
                    <Text style = {styles.date}>{date}</Text>
                </View>
            </View>
            
            <View style = {{...styles.bar, height: showBar ? 1 : 0}} />
        </TouchableOpacity>
    )
}

export default Record