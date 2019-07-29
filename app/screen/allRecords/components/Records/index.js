import React, { Component } from 'react';
import { View,
         Text,
         FlatList } from 'react-native';
import { Record } from '../../../../components/common'
import styles from './styles';

/**
 * 
 * @param styles object
 * @param data array
 * @param devise string
 * @param title string
 * @param handleClickItem function 
 */
const Records = props => {

    const { style,
            data,
            devise,
            title,
            handleClickItem } = props;

    return(
        <View style = {[style, styles.records]}>
            <Text style = {styles.title}>{title}</Text>
            <View style = {styles.listData}>
                <FlatList
                    data = {data}
                    horizontal = {false}
                    renderItem = {({item, index}) => <Record
                                                        key = {item.key}
                                                        onPress = {() => handleClickItem(item.key, item.transfert)}
                                                        category = {item.category}
                                                        description = {item.description}
                                                        devise = {devise}
                                                        amount = {item.type === 'income' ? item.amount : (-1 * item.amount)}
                                                        date = {item.date}
                                                        showBar = {data.length - 1 === index ? false : true } 
                                                    /> 
                                } 
                />
            </View>
            
        </View>
    )
}

export default Records