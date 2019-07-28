import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { IconButton } from '../button';
import styles from './styles';

/**
 * @param styles object
 * @param color color
 * @param data array[string]
 */
class ChangeSelect extends Component {

    state = {
        selected: 0,
        data: []
    }

    componentDidMount(){
        const { data } = this.props;
        this.setState({data: data})
    }

    onClickArrow = (click) => {

        const { selected, data } = this.props;

        if (click === 'right') {
            this.setState({selected: selected === (data.size - 1) ?  0 : selected++})
        } else {
            this.setState({selected: selected === 0 ? (data.size - 1) : selected--})
        }
    }

    render() {

        const { color,
                style } = this.props;
        const { selected,
                data } = this.state;

        return (
            <View style = {style}>
                <IconButton
                    onPress = { () => this.onClickArrow('left')}
                    icon = "md-arrow-dropleft"
                    size = {18}
                    color = {color}
                />
                <Text style = {[styles.textChangeSelect, {color: color}]}>
                    {data[selected]}
                </Text>
                <IconButton
                    onPress = {() => this.onClickArrow('right')}
                    icon = "md-arrow-dropright"
                    size = {18}
                    color = {color} 
                />
            </View>
        )
    }
}

export default ChangeSelect
