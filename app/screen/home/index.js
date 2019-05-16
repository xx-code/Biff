import React, {Component} from 'react';
import { View,
         ScrollView,
         ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Graph from './components/Graph';
import TotalAmount from './components/TotalAmount';
import Accounts from './components/Accounts';
import LastRecords from './components/LastRecords'
import { records, stat } from '../../temp/fakeData';
import StatResume from './components/StatResume';
import DataBase from '../../data/dataBase';
import ModalAddAccount from './components/ModalAddAccount';
import ModalModifyAccount from './components/ModalModifyAccount';
import Account from '../../data/model/account';
import Record from '../data/model/record';
import styles from './styles';

class Home extends Component{

    state = {
        accounts: [],
        account: new Account(),
        accountSelected: null,
        accountSelectedId: null,
        showModalAdd: false,
        showModalModify: false,
        loadingAccountsHide: true,
        db : new DataBase()
    }

    componentDidMount(){
        SplashScreen.hide();
        this.fetchAllAccount()
    }

    fetchAllAccount = async () => {
        this.setState({loadingAccountsHide: false})
        this.state.db.getAccounts().then(res => {
            let array = res;
            console.log(res[0].records)
            
            if (res.length >= 1) {
                let allAccount = new Account(
                    'all',
                    'Tous',
                    '#3D3D3D')
                for (let e = 0; e < array.length; e++) { 
                    console.log(array[e].records[0])
                    for (let i = 0; i < array[e].records.length; i++) {
                        console.log(account.records[i])
                    }
                }
                allAccount.setAmount()
                console.log(allAccount)
                array.push(allAccount)
            }

            let account = res.length >= 1 ? array[array.length - 1] : new Account("null", "any", "#000")

            this.setState({accounts: array, 
                        loadingAccountsHide: true, 
                        account: account})
        })
    }

    addAccount = (name, color) => {
        let okSave = true
        if (name === '')
        {
            okSave = false; 
            ToastAndroid.show("Erreur pendant l'enregistrement  nom est vide", ToastAndroid.SHORT)
        }

        if (color === '')
        {
            okSave = false; 
            ToastAndroid.show("Erreur pendant l'enregistrement aucune couleur enregistré", ToastAndroid.SHORT)
        }

        if (okSave) {
            if (this.state.accountSelectedId === null) {
                this.state.db.setAccount({name: name, color: color}).then(res => {
                if (res) {
                    this.setState({showModalAdd: false})
                    ToastAndroid.show("Données Enregistré", ToastAndroid.SHORT);
                    this.fetchAllAccount();
                } else {
                    this.setState({showModalAdd: false})
                    ToastAndroid.show("DB Erreur pendant l'enregistrement des données", ToastAndroid.SHORT);
                }
            })
            } else {
                this.state.db.modifyAccount(this.state.accountSelectedId, {name: name, color: color}).then(res => {
                    if (res) {
                        this.setState({showModalAdd: false, accountSelected: null, accountSelectedId: null})
                        ToastAndroid.show("Données Modifier", ToastAndroid.SHORT);
                        this.fetchAllAccount();
                    } else {
                        this.setState({showModalAdd: false})
                        ToastAndroid.show("DB Erreur pendant la modification des donnée", ToastAndroid.SHORT);
                    }
                })
            }
            
        } 
            
    }

    deleteAccount = (id) => {
        console.log(id)
        this.state.db.deleteAccount(id).then(res => {
            if (res) 
            { 
                this.setState({showModalModify: false, accountSelectedId: null})
                ToastAndroid.show("Données Supprimé", ToastAndroid.SHORT);
                this.fetchAllAccount();
            } else {
                this.setState({showModalModify: false})
                ToastAndroid.show("DB Erreur pendant l'enregistrement des données", ToastAndroid.SHORT);
            } 
        })
    }

    onLongClickAccount = id => {
        const { accounts } = this.state

        if (id !== 'all') {
            this.setState({
                showModalModify: true,
                accountSelectedId: id,
                accountSelected: accounts[accounts.findIndex(account => account.key === id)]
            })
        }  
    }

    render(){

        const { navigation } = this.props;
        const { accounts, 
                showModalAdd,
                account,
                db,
                showModalModify,
                accountSelectedId,
                accountSelected,
                loadingAccountsHide } = this.state;
    
        return(
            <View style = {styles.container}>
                <TotalAmount
                    onClickAdd = {() => navigation.navigate('AddRecord')}
                    amount = {`${account.amount} FCFA`}
                />
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <Accounts
                        style = {styles.accounts}
                        data = {accounts}
                        loadingHide = {loadingAccountsHide}
                        devise = "FCFA"
                        onClickAccount = {() => {}} 
                        onLongClickAccount = {this.onLongClickAccount}
                        addAccount = {() => this.setState({showModalAdd: true})}
                    />

                    <LastRecords
                        style = {styles.lastRecords}
                        data = {account.records}
                        devise = "FCFA"
                        handleClickItem = {() => {}}
                        handleClickMore = {() => {}}
                    />

                    <Graph
                        style = {styles.pieChart}
                        chart = "Pie"
                        title = "Pie Chart"
                        contentInset= {10}
                        data = {[50, 10, 40, 95, -4, -24, 85]}
                        height = {220}
                        labelSvg = {{ fontSize: 10, fill: 'black' }}
                        svg = {{fill: 'rgb(36, 116, 225)'}}
                        label = {['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7']}
                    />

                    <Graph
                        style = {styles.barChart}
                        chart = "Bar"
                        title = "Bar Chart"
                        contentInset= {{top: 30, bottom: 30}}
                        data = {[50, 10, 40, 95, -4, -24, 85]}
                        height = {220}
                        width = "100%"
                        labelSvg = {{ fontSize: 10, fill: 'black' }}
                        svg = {{fill: 'rgb(134, 65, 244)'}}
                        label = {['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7']}
                    />

                    <StatResume
                        style = {styles.resumBudget}
                        data = {stat}
                        title = "Budget"
                        icon = "money-check-alt"
                        handleClickMore = {() => {}}
                        color = "#E74C3C"
                    />

                    <StatResume
                        style = {styles.resumGoal}
                        data = {stat}
                        title = "Goal"
                        icon = "piggy-bank"
                        handleClickItem = {() => {}}
                        color = "#3498DB"
                    />
                </ScrollView>
                <ModalAddAccount
                    accountSelected = {accountSelected}
                    visible = {showModalAdd}
                    onShow = {() => this.setState({showModalAdd: false})}
                    addClick = {this.addAccount}
                />
                <ModalModifyAccount
                    show = {showModalModify}
                    back = {() => this.setState({showModalModify: false, accountSelectedId: null})}
                    modified = {() => this.setState({showModalAdd: true, showModalModify: false})}
                    id = {accountSelectedId}
                    deleted = {this.deleteAccount}
                />
            </View>
        )
    }
}

export default Home