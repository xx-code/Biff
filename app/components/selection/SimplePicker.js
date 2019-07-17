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
 * @param data array of object {name: string key: string}
 * @param label string
 * @param disable boolean
 * @param name string
 */
class SimplePicker extends Component {

    state = {
        selected: '',
        hideSelection: true
    }

    onClickItem = (value, label) => {
        this.setState({selected: label, hideSelection: true});
        const { name } = this.props;
        this.props.onChangeValue(value, name);
    }

    render(){

        const { selected,
                hideSelection } = this.state;
        const { style,
                data,
                label,
                disable } = this.props;

        return(
            <View style = {style}>
                <Text style = {styles.labelPicker}>{label}</Text>
                <View  style = {styles.selectedPicker}>
                    <Text style = {styles.textSelectSimplePicker}>{selected}</Text>
                    <HideView hide = {disable}>
                        <IconButton
                            icon = "md-arrow-dropdown"
                            size = {28}
                            onPress = { () => this.setState(prevState => ({hideSelection: !prevState.hideSelection}))}
                            color = {SECONDARY_COLOR_HIGHT} 
                        />
                    </HideView>   
                </View>
                
                <View style = {styles.simplePickerUnderLine}></View>
                <HideView
                    style = {styles.hideView} 
                    hide = {hideSelection}>
                    <FlatList
                        data = {data}
                        keyExtractor = {(item, value) => item.key}
                        showsVerticalScrollIndicator = {false}
                        renderItem = {({item, index}) => <Item 
                                                            key = {item.key}
                                                            label = {item.name}
                                                            onPress = {() => this.onClickItem(item.key, item.name)} 
                                                         />
                                     } 
                    />
                </HideView>
            </View>
        )
    }
}

export default SimplePicker