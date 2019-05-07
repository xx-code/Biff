import React, {Component} from 'react';
import { View, 
         TextInput,
         Text } from 'react-native';
import styles from './styles';
import { SECONDARY_COLOR_HIGHT, PRIMARY_COLOR } from '../../config/colors';


/**
 * 
 * @param style object
 * @param onChangeText function
 * @param value string
 * @param label string
 * @param name string 
 * @param keyboardType value
 */
class SimpleInput extends Component {

    state = {
        color: SECONDARY_COLOR_HIGHT
    }

    render(){
        const { style,
                onChangeText,
                value,
                label,
                name,
                error,
                keyboardType } = this.props;
        const {color} = this.state;
        return(
            <View style = {[style, styles.simpleInput]}>
                <Text style = {{...styles.simpleInputLabel, color: color}}>{label}</Text>
                <TextInput
                    style = {styles.simpleInputField}
                    onChangeText = {text => onChangeText(text, name)}
                    value = {value}
                    onFocus = {() => this.setState({color: PRIMARY_COLOR})}
                    onEndEditing = {() => this.setState({color: SECONDARY_COLOR_HIGHT})}
                    underlineColorAndroid = {color}
                    keyboardType = {keyboardType}
                />
                <Text style = {styles.errors}>{error}</Text>
            </View>
        )
    }
}

export default SimpleInput