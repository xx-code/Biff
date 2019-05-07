import React, {Component} from 'react';
import { TextInput, 
         Text,
         View } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_HIGHT } from '../../config/colors';
import styles from './styles';

/**
 * @param style string 
 * @param name string
 * @param label sting
 * @param onChangeText function(text, name)
 * @param secureTextEntry boolean
 * @param value string
 * @param autoCapitalize string 
 */

class HighInput extends Component{

    state = {
        colorBorder : SECONDARY_COLOR_HIGHT
    }

    render(){

        const { style, 
                name,
                label,
                placeholder,
                onChangeText,
                secureTextEntry,
                value,
                error,
                autoCapitalize } = this.props;

        const { colorBorder } = this.state;
        
        return(
            <View style = {style}>
                <Text style = {styles.labelHigh}>{label}</Text>
                <TextInput
                    style = {{...styles.HighInput, borderColor : colorBorder}}
                    value = {value}
                    placeholder = {placeholder}
                    onChangeText = {(text) => onChangeText(text, name)}
                    secureTextEntry = {secureTextEntry}
                    autoCapitalize = {autoCapitalize}
                    selectionColor = {PRIMARY_COLOR}
                    onFocus = {() => this.setState({colorBorder : PRIMARY_COLOR})}
                    onEndEditing = {() => this.setState({colorBorder: SECONDARY_COLOR_HIGHT})}
                />
                <Text style = {styles.error}>{error}</Text>
            </View>
        )
    }
}

export default HighInput