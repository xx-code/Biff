import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         TRANSPARENT,
         SECONDARY_COLOR_LIGHT } from '../../../../config/colors';

const styles = StyleSheet.create({
    item: {
        paddingVertical: 25,
        paddingLeft: 15
    },
    textItem: {
      fontSize: 18,
      color: PRIMARY_COLOR  
    },
    bottomBar: {
        width: "100%",
        height: '1%',
        backgroundColor: PRIMARY_COLOR
    },
    displayMenu: {
        height: '100%',
        backgroundColor: TRANSPARENT
    },
    modal: {
        position: 'absolute', 
        width: '100%', 
        top: '50%', 
        marginTop: -50
    },
    modalContent: {
        marginHorizontal: 15,
        backgroundColor: SECONDARY_COLOR_LIGHT
    }
})

export default styles