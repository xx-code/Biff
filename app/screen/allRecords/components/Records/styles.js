import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_LIGHT, 
         PRIMARY_COLOR_HIGHT } from '../../../../config/colors';

const styles = StyleSheet.create({
    records: {
        marginTop: 18
    },
    title: {
        color: PRIMARY_COLOR_HIGHT,
        fontSize: 16,
        marginLeft: 5
    },
    listData: {
        backgroundColor: SECONDARY_COLOR_LIGHT
    }
})

export default styles