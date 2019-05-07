import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_LIGHT, 
         PRIMARY_COLOR } from '../../../../config/colors';

const styles = StyleSheet.create({
    totalAmount: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: PRIMARY_COLOR
    },
    title: {
        fontSize: 16,
        fontWeight: '100',
        textAlign: 'center',
        color: SECONDARY_COLOR_LIGHT
    },
    boxInfo: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    amount: {
        color: SECONDARY_COLOR_LIGHT,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 24
    },
    addButton: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
})

export default styles