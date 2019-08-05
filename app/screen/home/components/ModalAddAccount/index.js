import React, {Component} from 'react';
import { Modal,
         View,
         FlatList } from 'react-native';
import { SimpleButton, 
         IconButton } from '../../../../components/button';
import { SimpleInput } from '../../../../components/input';
import ColorIndicator from './ColorIndicator';
import colors from '../../../../config/colorTable';
import styles from './styles';
import { TEXT_PRIMARY_COLOR } from '../../../../config/colors';

/**
 * @param visible boolean
 * @param onShow function
 * @param addClick function
 */
class ModalAddAccount extends Component {

    state = {
        color: colors[0].color,
        colorSelected: '1',
        name: ''
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.accountSelected !== null) {
            
            colorSelect = nextProps.accountSelected

            this.setState({
                color: colorSelect.color,
                name: colorSelect.name,
                colorSelected: colors[colors.findIndex(color => color.color === colorSelect.color)].key
            })
        }
    }

    onChangeText = (text, name) => {
        this.setState({[name]: text})
    }

    onChangeColor = (key, color) => {
        this.setState({colorSelected: key,
                       color:  color})
    }

    back = () => {
        this.setState({
            color: colors[0].color,
            colorSelected: '1',
            color: colors[0].color,
            colorSelected: '1',
        })
        this.props.onShow()
    }

    render(){

        const { visible,
                addClick } = this.props;

        const { colorSelected,
                name,
                color } = this.state;

        return(
            <Modal
                animationType = "slide"
                transparent
                visible = {visible}
                onRequestClose = {this.back}
            >
                <View style = {styles.container}>
                    <View style = {styles.background}></View>
                    <View style = {styles.content}>
                        <View style = {styles.header}>
                            <IconButton
                                onPress = {this.back}
                                icon = "md-close"
                                size = {30}
                                color = {TEXT_PRIMARY_COLOR} 
                            />
                        </View>
                        <View style = {styles.inputField}>
                            <SimpleInput
                                onChangeText = {this.onChangeText}
                                label = "Nom du compte" 
                                value = {name} 
                                name = "name"
                                
                            />
                            <View style = {styles.colorList}>
                                {
                                    colors.map((item, id) => {
                                        return (
                                            <ColorIndicator
                                                key = {item.key} 
                                                color = {item.color}
                                                active = {item.key == colorSelected ? true : false}
                                                select = {() => this.onChangeColor(item.key, item.color)}
                                            />
                                        )
                                    })
                                }
                            </View>
                            {/*<FlatList
                                style = {styles.colorList}
                                data = {colors}
                                horizontal
                                showsHorizontalScrollIndicator = {false}
                                renderItem = {({item}) => { 
                                        return (<ColorIndicator 
                                                    
                                                 />)
                                }} 
                            />*/}
                            <View style = {styles.buttonField}>
                                <SimpleButton
                                    onPress = { () => addClick(name, color)}
                                    label = "Ajouter Compte" 
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalAddAccount