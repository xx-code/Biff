import React from 'react';
import { FlatList,
         View,
         Modal,
         TouchableOpacity } from 'react-native';
import MenuItem from './MenuItem';
import styles from './styles';

/**
 * 
 * @param menuItems array
 * @param show boolean 
 * @param back function 
 */
const Menu = props => {
    
    const { menuItems,
            show,
            back } = props;

    return(
        <Modal
            visible = {show}
            animationType = "slide"
            onRequestClose = {back}
            transparent
        >
            <TouchableOpacity onPress = {back} style = {styles.displayMenu}>
            </TouchableOpacity>
            <View style = {{position: 'absolute', width: '100%', top: '50%', marginTop: -50}}>
                <FlatList
                    style = {styles.menu}
                    data = {menuItems}
                    renderItem = { ({item}) => <MenuItem
                                                    text = {item.text}
                                                    onPress = {item.click}
                                                    end = {item.barEnd}
                                                />
                                }            
                />
            </View>
        </Modal>
        
    )
}

export default Menu