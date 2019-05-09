import React from 'react';
import { View,
         Text,
         FlatList,
         ScrollView } from 'react-native';
import Card from './card';
import styles from './styles';
import { SimpleLoading } from '../../../../components/loading';
import { HideView } from '../../../../components/view'
import { AddButton } from '../../../../components/button';

/**
 * 
 * @param style object
 * @param data array
 * @param devise string
 * @param onClickAccount function 
 * @param addAccount function
 * @param loading boolean
 */
const Accounts = props => {

    const { style,
            data,
            devise,
            loadingHide,
            onClickAccount,
            addAccount } = props;

    return(
        <View style = {[style, styles.accounts]}>
            <Text style = {styles.title}>VOS COMPTES</Text>
            <ScrollView 
                showsHorizontalScrollIndicator = {false} >
                <SimpleLoading active = {loadingHide}/>
                <HideView 
                        style = {styles.accountContent} 
                        hide = {!loadingHide}>
                    <FlatList
                        data = {data}
                        horizontal = {true}
                        renderItem = {({item}) =>{
                            return <Card
                                        onPress= {onClickAccount}
                                        account = {item}
                                        devise = {devise}
                                    />
                        }  
                                    }
                        showsHorizontalScrollIndicator = {false} 
                    />
                    <View style = {styles.contentBtn}>
                        <AddButton
                            style = {styles.addButton} 
                            onPress = {addAccount}
                        />
                    </View>
                </HideView>
            </ScrollView>
            
        </View>
    )
}

export default Accounts