import React, {Component} from 'react';
import { View, 
         Text,
         TouchableWithoutFeedback,
         FlatList } from 'react-native';
import { IconButton } from '../button';
import { SECONDARY_COLOR_HIGHT } from '../../config/colors';
import { HideView } from '../view';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
class ImageLabelPicker extends Component {

    state = {
        selected: '',
        hideSelection: true,
        icon: '',
        color: ''
    }

    componentWillMount () {
        const {data} = this.props;
        this.onClickItem(data[0].key, data[0].label, data[0].icon, data[0].color)
    }

    onClickItem = (key, label, icon, color) => {
        this.setState({selected: label, hideSelection: true, icon: icon, color: color});
        this.props.onChangeValue(key);
    }

    render(){

        const { selected,
                hideSelection,
                icon,
                color } = this.state;
        const { style,
                data,
                label} = this.props;

        return(
            <View style = {[style, styles.simplePicker]}>
                <HideView hide = {!hideSelection}>
                    <Icon 
                        style = {styles.icon}
                        name = {icon} 
                        size = {30}
                        color = {color}
                    />
                </HideView>
                <View style = {{flex: 1, marginLeft: 5}}>
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
                                                                onPress = {() => this.onClickItem(item.key, item.label, item.icon, item.color)} 
                                                            />
                                        } 
                        />
                    </HideView>
                </View>
            </View>
        )
    }
}

export default ImageLabelPicker