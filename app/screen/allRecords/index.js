import React, { Component } from 'react';
import { View } from 'react-native';
import { ChangeSelect } from '../../components/selection';
import styles from './styles';
import { SECONDARY_COLOR_LIGHT } from '../../config/colors';

class AllRecords extends Component {

    static navigationOptions = {
        title: 'Toutes les Transactions',
    }


    render() {
        return (
            <View>
                <View style = {styles.navBalance}>
                    <ChangeSelect
                        color = {SECONDARY_COLOR_LIGHT}
                        data = { ['Ce Jour', 'Cette Semaine', 'Ce mois', 'Cet année'] }
                    />
                </View> 
            </View>
        )
    }
}

export default AllRecords