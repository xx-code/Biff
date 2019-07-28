import { StyleSheet } from 'react-native';
import { TEXT_PRIMARY_COLOR,
         TEXT_SECONDARY_COLOR,
         PRIMARY_COLOR,
         RED_COLOR } from '../../config/colors';

const styles = StyleSheet.create({
    record: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    icon : {
        marginRight: 10,
        
    },
    boxRecordInfo: {
        marginRight: 10,
        flex:3
    },
    category: {
        color: TEXT_PRIMARY_COLOR,
        fontSize: 16,
        marginBottom: 6
    },
    description: {
        color: TEXT_SECONDARY_COLOR,
        fontSize: 16
    },
    boxRecordPrice: {
        
    },
    amountIncome: {
        color: PRIMARY_COLOR,
        fontSize: 16,
        marginBottom: 6
    },
    amountDepense: {
        color: RED_COLOR,
        fontSize: 16,
        marginBottom: 6
    },
    date: {
        color: TEXT_SECONDARY_COLOR,
        fontSize: 14
    },
    bar: {
        backgroundColor: TEXT_SECONDARY_COLOR,
        width: '100%'
    }
})

export default styles