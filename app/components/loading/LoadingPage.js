import React from 'react';
import { Modal,
         Image,
         View } from 'react-native';
import LoadingMoney from '../../image/loadingMoney.gif'
import styles from './styles';

/**
 * 
 * @param show boolean 
 */
const LoadingPage = props => {
    
    const { show } = props;

    return(
        <Modal
            visible = {show}
            animationType = "slide"
            transparent
        >
            <View style = {styles.back}>
                <Image
                    source = {LoadingMoney}
                    style = {styles.imageLoading} 
                />
            </View>
        </Modal>
        
    )
}

export default LoadingPage