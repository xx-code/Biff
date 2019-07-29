import React, { Component } from 'react';
import { View,
         ScrollView,
         Text } from 'react-native';
import { ChangeSelect } from '../../components/selection';
import { LinkButton } from '../../components/button';
import Records from './components/Records';
import DataBase from '../../data/dataBase';
import { LoadingPage } from '../../components/loading';
import styles from './styles';
import { SECONDARY_COLOR_LIGHT } from '../../config/colors';


class AllRecords extends Component {

    static navigationOptions = {
        title: 'Toutes les Transactions',
    }

    state = {
        db: new DataBase(),
        loadingRecords: true,
        selectArrangeTime: 0,// 0: day, 1: week, 2: month, 3: year
        records: null
    }

    getParam = () => {
        const { navigation } = this.props;
        const idAccount = navigation.getParam('idAccount', null)
        return ({idAccount: idAccount})
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchAllRecords()
        });
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    arrangeByDay = () => {

    }
    
    arrangeByWeek = () => {

    }

    arrangeByMonth = () => {

    }

    arrangeByYear = () => {

    }

    arrangeTime = (select) => {
        console.log(select)
    }

    fetchAllRecords = () => {

        const { idAccount } = this.getParam();// get idAccound

        if (idAccount !== null) {
            if (idAccount === 'all') {
                this.state.db.getAllRecords().then(res => {
                    this.setState({loadingRecords: false, records: res})
                    this.arrangeTime(0)
                })
            } else {
                this.state.db.getRecordsBuyAccount(idAccount).then(res => {
                    this.setState({loadingRecords: false, records: res})
                    this.arrangeTime(0)
                })
            }
        } else {
            this.setState({loadingRecords: false})
        }     
    }

    onClickRecord = (id, transfert) => {
        let  screen = 'AddRecord';
        if (transfert) {
           screen = 'Transfert';
        }

        this.props.navigation.navigate(screen, {
            idRecord: id
        }) 
    }

    render() {

        const { loadingRecords,
                records } = this.state;

        return (
            <View style = {styles.container}>
                <View style = {styles.navBalance}>
                    <ChangeSelect
                        color = {SECONDARY_COLOR_LIGHT}
                        data = { ['Jour', 'Semaine', 'mois', 'année'] }
                        onClick = {this.arrangeTime}
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
                <ScrollView showsVerticalScrollIndicator = {false}>
                { /*
                    records.map((val) => {
                        return(
                            <Records
                                title = {val.title}
                                key = {val.key}
                                data = {val.records}
                                handleClickItem = {() => {}} 
                            />
                        )
                    }) */
                }
                    <Records
                         title = '01/05 - 06/01'
                         data = {records}
                         devise = 'FCFA'
                         handleClickItem = {this.onClickRecord}
                    />
                </ScrollView>
                <LoadingPage
                     show = {loadingRecords}
                />
            </View>
        )
    }
}

export default AllRecords