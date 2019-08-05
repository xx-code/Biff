import React, {Component} from 'react';
import { View, 
         Text,
         ToastAndroid,
         TimePickerAndroid,
         DatePickerAndroid } from 'react-native';
import { SimpleButton,
         LinkButton } from '../../components/button';
import { SimpleInput,
         SimpleInputPosAction } from '../../components/input';
import { SimplePicker, 
         SingleSelect } from '../../components/selection';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DataBase from '../../data/dataBase';
import { LoadingPage } from '../../components/loading';
import styles from './styles';

class AddRecord extends Component{
    static navigationOptions = {
        title: 'Ajouter Une Transaction',
    }

    state = {
        accountTo: null,
        accounts: [],
        accountFrom: null,
        description: '',
        date: '',
        time: '',
        amount: '',
        loading: false,
        oldAmount: 0,
        errors: {},
        db: new DataBase()
    }

    getParam = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('idRecord', null)
        return ({id: id})
    }

    componentDidMount() {
        this.fetchAccount()
        const param = this.getParam()         
        if (param.id !== null) {
            this.fetchRecord(param.id)
        }
    }

    fetchAccount = () => {
        this.state.db.getAccounts().then(res => {
            if (res.length > 0) {
                this.setState({accounts: res})
            }
        })
    }

    fetchRecord = (id) => {

        this.state.db.getRecord(id).then(res => {
            if(res !== null) {

                let accountKey  = res.type === 'income' ? (res.accountId - 1) : parseInt(res.accountId);

                console.log(accountKey)
                
                const accountFrom = this.state.accounts.find(account => account.key === accountKey.toString())
                const accountTo = this.state.accounts.find(account => account.key  === (accountKey + 1).toString())
                //(account)
                this.setState({
                    type: res.type,
                    description: res.description,
                    date: res.date,
                    accountTo: accountTo,
                    accountFrom: accountFrom,
                    time: res.time,
                    oldAmount: res.amount,
                    amount: res.amount.toString()
                })
                this._selectAccountFrom.onClickItem(accountFrom, accountFrom.name)
                this._selectAccountTo.onClickItem(accountTo, accountTo.name)
                
            } else {
                ToastAndroid.show("Errors transaction n'existe pas", ToastAndroid.LONG)
                this.props.navigation.goBack()
            }
        })
    }

    onChangeValueAccount = (value, account) => {
        this.setState({[account]: value})
    }

    onChangeType = value => {
        this.setState({type: value})
    }

    onChangeText= (text, name) => {
        this.setState({[name]: text})
    }

    onChangeTime = async () => {
        try 
        {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: new Date(Date.now()).getHours(),
              minute: new Date(Date.now()).getMinutes(),
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const hours =  hour < 10 ? `0${hour}` : hour;
                const minutes = minute < 10 ? `0${minute}` : minute
                this.setState({time: `${hours} : ${minutes}`})
            }
        } 
        catch ({code, message}) 
        {
            ToastAndroid.show('Cannot open time picker', ToastAndroid.LONG);
        }          
    }

    onChangeDate = async () => {
        try 
        {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(Date.now()),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const resetMonth = month < 10 ? `0${month + 1}` : month + 1
                const resetDay = day < 10 ? `0${day}` : day
                this.setState({date: `${resetMonth}/${resetDay}/${year}`})
            }
        } 
        catch ({code, message}) {
            ToastAndroid.show('Cannot open date picker', ToastAndroid.LONG);
        }
    }

    saveValue = () => {
        const { accountTo,
                accountFrom, 
                date,
                accounts,
                oldAmount,
                time,
                amount
                } = this.state;
        
        const { navigation } = this.props;

        let okSave = true;
        let errors = {}
        if (accountTo === null ){
            okSave = false;
            errors.accountTo = "Selectionner le compte de depôt";
        } else {
            errors.accountTo = '';
        }

        if (accountFrom === null ){
            okSave = false;
            errors.accountFrom = 'Selectionner le compte  d\'envoi';
        } else {
            errors.accountFrom = '';
        }

        if (accountFrom === accountTo ){
            okSave = false;
            errors.accountFrom = 'Impossible de selection deux meme compte';
        } else {
            errors.accountFrom = '';
        }

        if ( parseInt(amount) <= 0) {
            okSave = false;
            errors.amount = 'Entrer une somme superieur a 0';
        } else {
            errors.amount = '';
        }

        if (accountFrom !== null) {

            if ( parseInt(amount) > (accountFrom.amount + oldAmount)) {
                okSave = false;
                errors.amount = 'Entrer une somme minimum ou equal au montant total du compte';
            } else {
                errors.amount = '';
            }
        } 

        if (date === '' ){
            okSave = false;
            errors.date = 'Choisissez une date';
        } else {
            errors.date = '';
        }

        if (time === '' ){
            okSave = false;
            errors.time = 'Choisissez un temps';
        } else {
            errors.time = '';
        }

        if (okSave) {
            this.setState({loading: true})
            let dataTo = {
                accountId: accountTo,
                type: 'income',
                amount: parseInt(amount), 
                description: `compte de depôt ${accountTo.name}`, 
                date: date, 
                time: time, 
                category: 8, 
                transfert: 0
            }

            let dataFrom = {
                accountId: accountFrom,
                type: 'depense',
                amount: parseInt(amount), 
                description: `compte d\'envoi ${accountFrom.name}`, 
                date: date, 
                time: time, 
                category: 8,
                transfert: 0 
            }

            //(dataFrom)

            const param = this.getParam()
        

           if (param.id) {
                this.state.db.modifyRecord(param.id, dataFrom).then(res => {
                    if (res) {
                        this.state.db.modifyRecord((parseInt(param.id) + 1).toString(), dataTo).then(res => {
                            this.setState({loading: false})
                            if (res) {
                                navigation.goBack()
                                ToastAndroid.show('Transaction modifié', ToastAndroid.SHORT)
                            } else {    
                                ToastAndroid.show('Impossible de modifier la transaction', ToastAndroid.SHORT)
                            }
                        })
                    } else {
                        this.setState({loading: false})
                        ToastAndroid.show('Impossible de modifié', ToastAndroid.SHORT)
                    }
                })
            } else {
                this.state.db.addRecord(dataFrom).then(res => {
                    if (res) {
                        this.state.db.addRecord(dataTo).then(res => {
                            this.setState({loading: false})
                            if (res) {
                                navigation.goBack()
                                ToastAndroid.show('Transaction sauvegardé', ToastAndroid.SHORT)
                            } else {    
                                ToastAndroid.show('Impossible de sauvegarder la transaction', ToastAndroid.SHORT)
                            }
                        })
                    } else {
                        this.setState({loading: false})    
                        ToastAndroid.show('Transfer impossible', ToastAndroid.SHORT)
                    }
                })
            }
            
            
        } else {
            this.setState({errors: errors, loading: false});
        }
        
        
    }

    render(){

        const {
                amount,
                accounts,
                date,
                time,
                loading,
                errors } = this.state;

                const {id} = this.getParam();

        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <View style = {styles.cutView}>
                            <SimplePicker
                                ref = { c => this._selectAccountFrom = c }
                                label = "Depuis Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                name = "accountFrom"
                                data = {accounts} 
                                disable =  {id === null ? false : true}
                            />
                            <Text style = {styles.errors}>{errors.accountFrom}</Text>
                            <SimplePicker
                                ref = { c => this._selectAccountTo = c }
                                label = "Vers Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                name = "accountTo"
                                data = {accounts} 
                            />
                            <Text style = {styles.errors}>{errors.accountTo}</Text>
                        </View>
                        <View style = {styles.viewTime}>
                            <SimpleInputPosAction
                                style = {styles.inputDate}
                                label = "Date" 
                                name = "date"
                                error = {errors.date}
                                value = {date}
                                onClickAction = {this.onChangeDate}
                            />
                            <SimpleInputPosAction
                                style = {styles.inputTime} 
                                label = "Time"
                                name = "time"
                                error = {errors.time}
                                value = {time}

                                onClickAction = {this.onChangeTime}
                            />
                        </View>
                        <View style = {styles.cutView}>
                            <SimpleInput
                                keyboardType = "numeric"
                                label = "Somme"
                                name = "amount"
                                value = {amount}
                                error = {errors.amount}
                                onChangeText = {this.onChangeText}
                            />
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <SimpleButton 
                            label = {id === null ? 'Sauvegarder' : 'Modifer'}
                            onPress = {this.saveValue}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <LoadingPage show = {loading} /> 
            </View>
        )
    }
    
}

export default AddRecord