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
import styles from './styles';

class AddRecord extends Component{
    static navigationOptions = {
        title: 'Ajouter Une Transaction',
    }

    state = {
        account: '',
        type: '',
        description: '',
        date: '',
        time: '',
        amount: ''
    }

    onChangeValueAccount = value => {
        this.setState({account: value})
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

    render(){

        const { description,
                amount,
                date,
                time } = this.state;

        return(
            <View style = {styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View style = {styles.inpView}>
                        <View style = {styles.cutView}>
                            <SimplePicker
                                label = "Depuis Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                data = {[{label: 'unit', value: 'u'}, {label: 'rider', value: 'r'}, {label: 'venus', value: 'v'}]} 
                            />
                            <SimplePicker
                                label = "Vers Compte"
                                onChangeValue = {this.onChangeValueAccount}
                                data = {[{label: 'unit', value: 'u'}, {label: 'rider', value: 'r'}, {label: 'venus', value: 'v'}]} 
                            />
                        </View>
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
                            />
                            <SimpleInputPosAction
                                style = {styles.inputTime} 
                                label = "Time"
                                name = "time"
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
                                onChangeText = {this.onChangeText}
                            />
                        </View>
                    </View>
                    <View style = {styles.buttonView}>
                        <SimpleButton 
                            label = "Sauvegarder"
                            onPress = {() => console.warn(this.state)}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
    
}

export default AddRecord