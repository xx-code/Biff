import React from 'react';
import { View,
         Text,
         FlatList,
         ScrollView } from 'react-native';
import Card from './card';
import styles from './styles';
import { AddButton } from '../../../../components/button';

/**
 * 
 * @param style object
 * @param data array
 * @param devise string
 * @param onClickAccount function 
 * @param addAccount function
 */
const Accounts = props => {

    const { style,
            data,
            devise,
            onClickAccount,
            addAccount } = props;

    return(
        <View style = {[style, styles.accounts]}>
            <Text style = {styles.title}>VOS COMPTES</Text>
            <ScrollView showsHorizontalScrollIndicator = {false} >
                <FlatList
                    data = {data}
                    horizontal = {true}
                    renderItem = {({item}) => <Card
                                                onPress= {onClickAccount}
                                                account = {item}
                                                devise = {devise}
                                            /> 
                                }
                    showsHorizontalScrollIndicator = {false} 
                />
                <AddButton
                    style = {styles.addButton} 
                    onPress = {addAccount}
                />
            </ScrollView>
            
        </View>
    )
}

export default Accounts