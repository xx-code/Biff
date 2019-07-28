import { StyleSheet } from 'react-native';
import { TEXT_PRIMARY_COLOR, 
         TEXT_SECONDARY_COLOR, 
         PRIMARY_COLOR,
         SECONDARY_COLOR_LIGHT,
         RED_COLOR} from '../../../../config/colors';

const styles = StyleSheet.create({
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