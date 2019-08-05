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
import { HideView } from '../../components/view';
import { LoadingPage } from '../../components/loading';

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
        loading: false,
        db: new DataBase()
    }

    getParam = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('idRecord', null)
        return ({id: id})
    }

    componentDidMount(){
        console.log(this.getParam())
        this.fetchAccount()
        const param = this.getParam() 
        const {navigation} = this.props        
        //(param)
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
                //(account)
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
            this.setState({loading : true})
            let data = {
                accountId: account,
                type: type,
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
                    this.setState({loading : false})
                    if (res) {
                        
                        navigation.goBack()
                        ToastAndroid.show('Transaction modifié', ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Impossible de modifié la transaction', ToastAndroid.SHORT)
                    }
                })
            } else {
                this.state.db.addRecord(data).then(res => {
                    this.setState({loading : false})
                    if (res) {
                        navigation.goBack()
                        ToastAndroid.show('Transaction sauvegardé', ToastAndroid.SHORT)
                    } else {    
                        ToastAndroid.show('Impossible de sauvegarder la transaction', ToastAndroid.SHORT)
                    }
                })
            }
            
            
        } else {
            this.setState({errors: errors, loading: false});
        }

    }

    render(){

        const { description,
                amount,
                accounts,
                date,
                category,
                loading,
                time,
                errors } = this.state;

        const { navigation } = this.props;
        const { id } = this.getParam();
        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <SingleSelect
                            ref = { c => this._selectSingle = c }                            
                            label1= "Revenu"
                            label2= "Dépense"
                            value1= "income"
                            value2= "depense" 
                            onChangeValue = {this.onChangeType}
                        />
                        <View style = {styles.cutView}>
                            <SimplePicker
                                ref = { c => this._selectAccount = c }
                                disable = {id === null ? false : true}
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
                        <HideView hide = {id === null ? false : true} >
                            <LinkButton 
                                label = "Transfère"
                                fontSize = {18}
                                onPress = {() => navigation.navigate('Transfert')}
                            />
                        </HideView>
                        
                    </View>
                </KeyboardAwareScrollView>
                <LoadingPage show = {loading} />
            </View>
        )
    }
    
}

export default AddRecord