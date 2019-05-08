import React from 'react';
import { View,
         Text,
         FlatList,
         ScrollView } from 'react-native';
import Card from './card';
import styles from './styles';
import { HideView } from '../../../../components/view'
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
                    renderItem = {({item}) =>{
                        console.log(item)
                        return <Card
                                    onPress= {onClickAccount}
                                    account = {item}
                                    devise = {devise}
                                />
                    }  
                                }
                    showsHorizontalScrollIndicator = {false} 
                />
                <HideView hide = {data.length > 0 ? true : false}>
                    <AddButton
                        style = {styles.addButton} 
                        onPress = {addAccount}
                    />
                </HideView>

            </ScrollView>
            
        </View>
    )
}

export default Accounts