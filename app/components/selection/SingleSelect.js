import React, {Component} from 'react';
import { View, 
         TouchableWithoutFeedback,
         Text } from 'react-native';
import styles from './styles';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_LIGHT } from '../../config/colors';

/**
 * @param style object
 * @param value1 string
 * @param value2 string
 * @param onChangeValue function (value)
 */
class SingleSelect extends Component{

    state = {
        selected: 0
    }

    onChangeValue = (value, index) => {
        this.setState({selected: index})
        this.props.onChangeValue(value);
    }

    render(){
        const { style,
                label1,
                label2,
                value1,
                value2 } = this.props;

        const { selected } = this.state;

        return(
                <View style = {style} >
                    <View style = {styles.singleSelect}>
                        <TouchableWithoutFeedback onPress = {() => this.onChangeValue(value1, 0)}>
                            <View style = {[styles.itemSingleSelect, selected === 0 ? styles.activeSingle : styles.inactiveSingle]}>
                                <Text style = {selected === 0 ? styles.activeSingleText : styles.inactiveSingleText}>{label1}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback  onPress = {() => this.onChangeValue(value2, 1)}>
                            <View style = {[styles.itemSingleSelect, selected === 1 ? styles.activeSingle : styles.inactiveSingle]}>
                                <Text style = {selected === 1 ? styles.activeSingleText : styles.inactiveSingleText}>{label2}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
    }
    
}

export default SingleSelect