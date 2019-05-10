import React from 'react';
import { 
         View,
         Modal,
         TouchableOpacity } from 'react-native';
import Item from './item';
import styles from './styles';

/**
 * 
 * @param show boolean 
 * @param back function 
 * @param modified function
 * @param deleted function
 */
const Menu = props => {
    
    const { modified,
            deleted,
            show,
            back } = props;

    return(
        <Modal
            visible = {show}
            animationType = "slide"
            onRequestClose = {back}
            transparent
        >
            <TouchableOpacity 
                onPress = {back} 
                style = {styles.displayMenu}>
            </TouchableOpacity>
            <View style = {styles.modal}>
                <View style = {styles.modalContent}>
                    <Item
                        onPress = {modified}
                        text = "Modifier"
                        bottomBar
                    />
                    <Item
                        onPress = {deleted}
                        text = "Supprimer"
                    />
                </View>
            </View>
        </Modal>
        
    )
}

export default Menu