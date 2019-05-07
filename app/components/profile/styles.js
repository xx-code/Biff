import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_LIGHT, 
         TRANSPARENT} from '../../config/colors';

const styles = StyleSheet.create({
    menuItem: {
        paddingHorizontal: 25,
        paddingTop: 18
    },
    menuItemText: {
        color: PRIMARY_COLOR,
        fontSize: 16,
        fontWeight: '500',
        paddingBottom: 18
    },
    bottomBar: {
        width: '100%',
        backgroundColor: PRIMARY_COLOR
    },
    menu: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        padding: 4,
        marginHorizontal: 10
    },
    imgProfile: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        width: 60,
        height: 60,
        borderRadius: 80
    },
    displayMenu: {
        height: '100%',
        backgroundColor: TRANSPARENT
    }
});

export default styles