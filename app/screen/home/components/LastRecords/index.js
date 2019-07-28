import React from 'react';
import { View, 
         Text,
         FlatList } from 'react-native';
import { LinkButton } from '../../../../components/button';
import { Record } from '../../../../components/common';
import styles from './styles';


const splitArray = tab => {
    return tab.length < 5 ? tab : tab.slice(0, 5)
}
 
/**
 * 
 * @param style object
 * @param data array 
 * @param devise string
 * @param handleClickItem function(key)
 * @param handleClickMore function 
 */
const LastRecords = props => {

    const { style,
            data,
            devise,
            handleClickMore,
            handleClickItem } = props;

    const array = splitArray(data)

    console.log(array)

    return(
        <View style = {[style, styles.lastRecords]}>
            <View style = {styles.title}>
                <Text style = {styles.nameTab}>Transactions</Text>
                <LinkButton
                    onPress = {handleClickMore}
                    label = "Afficher Plus" 
                    fontSize = {16}
                />
            </View>
            <FlatList
                data = {array}
                horizontal = {false}
                renderItem = {({item, index}) => <Record
                                                    onPress = {() => handleClickItem(item.key, item.transfert)}
                                                    category = {item.category}
                                                    description = {item.description}
                                                    devise = {devise}
                                                    amount = {item.type === 'income' ? item.amount : (-1 * item.amount)}
                                                    date = {item.date}
                                                    showBar = {array.length - 1 === index ? false : true } 
                                                 /> 
                             }
            />
        </View>
    )
}

export default LastRecords