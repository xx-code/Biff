import React, {Component} from 'react';
import { View, 
         Text,
         TouchableWithoutFeedback,
         FlatList } from 'react-native';
import { IconButton } from '../button';
import { SECONDARY_COLOR_HIGHT } from '../../config/colors';
import { HideView } from '../view'
import styles from './styles';

const Item = props => {
    
    const { label,
            onPress } = props;

    return (
        <TouchableWithoutFeedback 
            onPress = {onPress}>
            <View style = {styles.ItemSimplePicker}>
                <Text style = {styles.label}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

/**
 * @param style object
 * @param onChangeValue function(value)
 * @param data array of object {label: string value: string}
 * @param label string
 */
class SimplePicker extends Component {

    state = {
        selected: '',
        hideSelection: true
    }

    onClickItem = (value, label) => {
        this.setState({selected: label, hideSelection: true});
        this.props.onChangeValue(value);
    }

    render(){

        const { selected,
                hideSelection } = this.state;
        const { style,
                data,
                label} = this.props;

        return(
            <View style = {style}>
                <Text style = {styles.labelPicker}>{label}</Text>
                <View style = {styles.selectedPicker}>
                    <Text style = {styles.textSelectSimplePicker}>{selected}</Text>
                    <IconButton
                        icon = "md-arrow-dropdown"
                        size = {28}
                        onPress = { () => this.setState(prevState => ({hideSelection: !prevState.hideSelection}))}
                        color = {SECONDARY_COLOR_HIGHT} 
                    />
                </View>
                
                <View style = {styles.simplePickerUnderLine}></View>
                <HideView
                    style = {styles.hideView} 
                    hide = {hideSelection}>
                    <FlatList
                        data = {data}
                        keyExtractor = {(item, value) => item.label}
                        showsVerticalScrollIndicator = {false}
                        renderItem = {({item, index}) => <Item 
                                                            label = {item.label}
                                                            onPress = {() => this.onClickItem(item.value, item.label)} 
                                                         />
                                     } 
                    />
                </HideView>
            </View>
        )
    }
}

export default SimplePicker