import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_LIGHT,
         SECONDARY_COLOR } from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY_COLOR
    },
    navBalance : {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance: {
        flexDirection: 'row',
    },
    textBalance: {
        color: SECONDARY_COLOR_LIGHT
    }
})

export default styles