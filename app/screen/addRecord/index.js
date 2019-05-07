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

class AddRecord extends Component{
    static navigationOptions = {
        title: 'Ajouter Une Transaction',
    }

    state = {
        account: 0,
        type: '',
        description: '',
        date: '',
        time: '',
        amount: '',
        category: '',
        errors: {}
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

        let okSave = true;
        let errors = {}
        if (account === '' ){
            okSave = false;
            errors.account = 'Selectionner le compte de la transaction';
        }

        if (amount <= 0){
            okSave = false;
            errors.amount = 'Entrer une somme superieur a 0';
        }

        if (date === '' ){
            okSave = false;
            errors.date = 'Choisissez une date';
        }

        if (time === '' ){
            okSave = false;
            errors.time = 'Choisissez un temps';
        }

        if (okSave) {
            // save
        } else {
            this.setState({errors: errors});
        }

    }

    render(){

        const { description,
                amount,
                date,
                time,
                errors } = this.state;

        const { navigation } = this.props;
        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <SingleSelect
                            value1= "Revenu"
                            value2= "Dépense" 
                            onChangeValue = {this.onChangeType}
                        />
                        <View style = {styles.cutView}>
                            <SimplePicker
                                label = "Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                data = {[{label: 'unit', value: 'u'}, {label: 'rider', value: 'r'}, {label: 'venus', value: 'v'}]} 
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
                        <View style = {styles.cutView}>
                            <ImageLabelPicker
                                onChangeValue = {this.onChangeCategory}
                                data = {categoryIcon} 
                            />
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <SimpleButton 
                            label = "Sauvegarder"
                            onPress = {() => console.warn(this.state)}
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