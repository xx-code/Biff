import React, {Component} from 'react';
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
class Accounts extends Component{

    scrollAfterClick = key => {
        const { onClickAccount } = this.props;
        if (this.flatList !== null ){
            this.flatList.scrollToOffset({animated: true, offset: 0})
            onClickAccount(key)
        }
    }

    render() {
        const { 
            style,
            data,
            devise,
            loadingHide,
            addAccount,
            onLongClickAccount } = this.props;

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
                        ref = {(ref) => {this.flatList = ref}}
                        extraData = {(item) => item.key}
                        horizontal = {true}
                        renderItem = {({item}) =>{
                            return <Card
                                        key = {item.key}
                                        onPress= { () => this.scrollAfterClick(item.key)}
                                        account = {item}
                                        index = {data.indexOf(item)}
                                        onLongPress = {() => onLongClickAccount(item.key)}
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
}

export default Accounts