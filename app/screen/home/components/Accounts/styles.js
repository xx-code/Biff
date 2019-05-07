import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_LIGHT, 
         SECONDARY_COLOR_HIGHT} from '../../../../config/colors';

const styles = StyleSheet.create({
    card: {
        paddingLeft: 16,
        paddingRight: 8,
        paddingTop: 11,
        paddingBottom: 5,
        marginHorizontal: 15,
        width: 160,
        borderRadius: 5
    }, 
    accountName: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
    },
    accountAmount: {
        fontSize: 18,
        fontWeight: '500',
        color: SECONDARY_COLOR_LIGHT,
    },
    accountDevis: {
        flexDirection: 'row-reverse'
    },
    accounts: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        paddingTop: 8,
        paddingBottom: 15
    },
    title: {
        color: SECONDARY_COLOR_HIGHT,
        fontSize: 22,
        marginBottom: 8,
        fontWeight: '300',
        textAlign: 'center'
    },
    addButton: {
        marginRight: 15
    }
});

export default styles