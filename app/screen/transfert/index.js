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
        errors: {},
        db: new DataBase()
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
        /**gerre l
         * merde visualistion 
         */
        this.state.db.getRecord(id).then(res => {
            if(res !== null) {
                
                const account = this.state.accounts.find(account => account.key === res.accountId)
                console.log(account)
                this.setState({
                    type: res.type,
                    description: res.description,
                    date: res.date,
                    time: res.time,
                    amount: res.amount.toString(),
                    category: parseInt(res.category)
                })

                this._selectAccount.onClickItem(account.key, account.name)

                this._selectSingle.onChangeValue(res.type, res.type === 'income' ? 0 : 1)

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
              hour: 14,
              minute: 0,
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              this.setState({time: `${hour} : ${minute}` })
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
                this.setState({date: `${day}/${month}/${year}` })
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
                time,
                amount
                } = this.state;
        
        const { navigation } = this.props;

        console.log(this.state)

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

            if ( parseInt(amount) > accounts[parseInt(accountFrom)].amount) {
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
            let dataTo = {
                accountId: accountTo,
                type: 'income',
                amount: parseInt(amount), 
                description: `compte de depôt ${accountFrom.name}`, 
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

            console.log(dataFrom)

           /* const param = this.getParam()

            if (param.id) {
                this.state.db.modifyRecord(param.id, data).then(res => {
                    if (res) {
                        navigation.goBack()
                        ToastAndroid.show('Transaction modifié', ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Impossible de modifié la transaction', ToastAndroid.SHORT)
                    }
                })
            } else {*/
                this.state.db.addRecord(dataFrom).then(res => {
                    if (res) {
                        this.state.db.addRecord(dataTo).then(res => {
                            if (res) {
                                navigation.goBack()
                                ToastAndroid.show('Transaction sauvegardé', ToastAndroid.SHORT)
                            } else {    
                                ToastAndroid.show('Impossible de sauvegarder la transaction', ToastAndroid.SHORT)
                            }
                        })
                    } else {    
                        ToastAndroid.show('Transfer impossible', ToastAndroid.SHORT)
                    }
                })
            //}
            
            
        } else {
            this.setState({errors: errors});
        }
        
    }

    render(){

        const {
                amount,
                accounts,
                date,
                time,
                errors } = this.state;

        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <View style = {styles.cutView}>
                            <SimplePicker
                                label = "Depuis Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                name = "accountFrom"
                                data = {accounts} 
                            />
                            <Text style = {styles.errors}>{errors.accountFrom}</Text>
                            <SimplePicker
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
                            label = "Sauvegarder"
                            onPress = {this.saveValue}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
    
}

export default AddRecord