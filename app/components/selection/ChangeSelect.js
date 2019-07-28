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

        const { selected, data } = this.state;

        let select = selected;

        if (click === 'right') {
            select = selected === (data.length - 1) ?  0 : select + 1 ;
        } else {
            select = selected === 0 ? (data.length - 1) : select - 1;
        }

        this.setState({selected: select})
    }

    render() {

        const { color,
                style } = this.props;
        const { selected,
                data } = this.state;

        return (
            <View style = {[style, styles.changeSelect]}>
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
