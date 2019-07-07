import { StyleSheet } from 'react-native';
import { TEXT_PRIMARY_COLOR, 
         TEXT_SECONDARY_COLOR, 
         PRIMARY_COLOR,
         SECONDARY_COLOR_LIGHT} from '../../../../config/colors';

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
        color: '#ed3b38',
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
    },
    lastRecords: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: SECONDARY_COLOR_LIGHT
    },
    title: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameTab: {
        color: TEXT_SECONDARY_COLOR,
        fontSize: 16
    }
})

export default styles