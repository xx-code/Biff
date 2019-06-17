import React, {Component} from 'react';
import { View, 
         Text,
         ToastAndroid,
         TimePickerAndroid,
         DatePickerAndroid } from 'react-native';
import { SimpleButton,
         LinkButton } from '../../components/button';
import { SimpleInput,
         SimpleInputPosAction, } from '../../components/input';
import { SimplePicker, 
         SingleSelect,
         ImageLabelPicker } from '../../components/selection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import categoryIcon from '../../config/categoryIcon';
import DataBase from '../../data/dataBase';

class AddRecord extends Component{
    static navigationOptions = {
        title: 'Ajouter Une Transaction',
    }

    state = {
        account: '',
        type: 'income',
        accounts: [],
        description: '',
        date: '',
        time: '',
        amount: '0',
        category: 1,
        errors: {},
        db: new DataBase()
    }

    getParam = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('idRecord', null)
        return ({id: id})
    }

    componentDidMount(){
        this.fetchAccount()
        const param = this.getParam()         
        console.log(param)
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
                
                const account = this.state.accounts.find(account => account.key === res.accountId)
                console.log(account)
                this.setState({
                    account: account.name,
                    type: 'income',
                    description: res.description,
                    date: res.date,
                    time: res.time,
                    amount: res.amount.toString(),
                    category: parseInt(res.category)
                })
            } else {
                ToastAndroid.show("Errors transaction n'existe pas", ToastAndroid.LONG)
                this.props.navigation.goBack()
            }
        })
    }

    onChangeValueAccount = value => {
        this.setState({account: value})
    }

    onChangeType = value => {
        this.setState({type: value})
    }

    onChangeCategory = value => {
        this.setState({category: value})
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
                this.setState({date: `${day}/${month}/${year}` })
            }
        } 
        catch ({code, message}) {
            ToastAndroid.show('Cannot open date picker', ToastAndroid.LONG);
        }
    }

    saveValues = () => {
        const { account, 
                type,
                description,
                date,
                time,
                amount,
                category } = this.state;

        const { navigation } = this.props;

        let okSave = true;
        let errors = {}
        if (account === '' ){
            okSave = false;
            errors.account = 'Selectionner le compte de la transaction';
        } else {
            errors.account = '';
        }

        if ( parseInt(amount) <= 0) {
            okSave = false;
            errors.amount = 'Entrer une somme superieur a 0';
        } else {
            errors.amount = '';
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
            let data = {
                accountId: account,
                amount: parseInt(amount), 
                description: description, 
                date: date, 
                time: time, 
                category: category, 
                transfert: 1
            }

            const param = this.getParam()

            if (param.id) {
                this.state.db.modifyRecord(param.id, data).then(res => {
                    if (res) {
                        navigation.goBack()
                        ToastAndroid.show('Transaction modifié', ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Impossible de modifié la transaction', ToastAndroid.SHORT)
                    }
                })
            } else {
                this.state.db.addRecord(data).then(res => {
                    if (res) {
                        navigation.goBack()
                        ToastAndroid.show('Transaction sauvegardé', ToastAndroid.SHORT)
                    } else {    
                        ToastAndroid.show('Impossible de sauvegarder la transaction', ToastAndroid.SHORT)
                    }
                })
            }
            
            
        } else {
            this.setState({errors: errors});
        }

    }

    render(){

        const { description,
                amount,
                accounts,
                date,
                category,
                time,
                errors } = this.state;

        const { navigation } = this.props;
        const { id } = this.getParam();
        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <SingleSelect
                            label1= "Revenu"
                            label2= "Dépense"
                            value1= "income"
                            value2= "depense" 
                            onChangeValue = {this.onChangeType}
                        />
                        <View style = {styles.cutView}>
                            <SimplePicker
                                label = "Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                data = {accounts} 
                            />
                        </View>
                        <Text style = {styles.errors}>{errors.account}</Text>
                        <SimpleInput 
                            style = {styles.description}
                            label = "Description"
                            name = "description"
                            value = {description}
                            onChangeText = {this.onChangeText}
                        />
                        <View style = {styles.viewTime}>
                            <SimpleInputPosAction
                                style = {styles.inputDate}
                                label = "Date" 
                                name = "date"
                                value = {date}
                                onClickAction = {this.onChangeDate}
                                error = {errors.date}
                            />
                            <SimpleInputPosAction
                                style = {styles.inputTime} 
                                label = "Time"
                                name = "time"
                                value = {time}
                                onClickAction = {this.onChangeTime}
                                error = {errors.time}
                            />
                        </View>
                        <View style = {styles.cutView}>
                            <SimpleInput
                                keyboardType = "numeric"
                                label = "Somme"
                                name = "amount"
                                value = {amount}
                                onChangeText = {this.onChangeText}
                                error = {errors.amount}
                            />
                        </View>
                        <View style = {styles.cutViewPicker}>
                            <ImageLabelPicker
                                onChangeValue = {this.onChangeCategory}
                                data = {categoryIcon}
                                category = {category - 1} 
                            />
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <SimpleButton 
                            label = {id === null ? 'Sauvegarder' : 'Modifer'}
                            onPress = {this.saveValues}
                        />
                        <LinkButton 
                            label = "Transfère"
                            fontSize = {18}
                            onPress = {() => navigation.navigate('Transfert')}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
    
}

export default AddRecord