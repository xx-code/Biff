import React, { Component } from 'react';
import { View,
         Text } from 'react-native';
import { ChangeSelect } from '../../components/selection';
import { LinkButton } from '../../components/button';
import Records from './components/Records';
import { records } from '../../temp/fakeData';
import styles from './styles';
import { SECONDARY_COLOR_LIGHT } from '../../config/colors';

class AllRecords extends Component {

    static navigationOptions = {
        title: 'Toutes les Transactions',
    }


    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.navBalance}>
                    <ChangeSelect
                        color = {SECONDARY_COLOR_LIGHT}
                        data = { ['Jour', 'Semaine', 'mois', 'année'] }
                    />
                    <View style = {styles.balance}>
                        <Text style = {styles.textBalance}>Balance: </Text>
                        <Text style = {styles.textBalance}>4000</Text>
                        <Text style = {styles.textBalance}> CFA</Text>
                    </View>
                </View>
                <View style = {styles.navFilter}>
                    <LinkButton
                        onPress = {() => {}}
                        label = 'Filtre Option'
                        size = {14} 
                    />
                </View>
                <View>
                    <Records
                         title = '01/05 - 06/01'
                         data = {records}
                         devise = 'FCFA'
                         handleClickItem = {() => {}}
                    />
                </View>
            </View>
        )
    }
}

export default AllRecords