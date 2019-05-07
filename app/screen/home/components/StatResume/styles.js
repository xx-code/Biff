import { StyleSheet } from 'react-native';
import { TEXT_SECONDARY_COLOR,
         SECONDARY_COLOR_LIGHT,
         TEXT_PRIMARY_COLOR} from '../../../../config/colors';

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    label: {
        fontSize: 15,
        color: TEXT_SECONDARY_COLOR
    },
    statResume: {
        paddingHorizontal: 18,
        paddingVertical: 13,
        backgroundColor: SECONDARY_COLOR_LIGHT
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconLabel: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: TEXT_PRIMARY_COLOR
    },
    header: {
        marginBottom: 12
    },
    bottomStat: {
        marginTop: 10,
        flexDirection: 'row-reverse'
    }
})

export default styles