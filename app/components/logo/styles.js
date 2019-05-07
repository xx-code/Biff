import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_HIGHT } from '../../config/colors';

const Styles = StyleSheet.create({
    simpleLogo:{
        alignItems: 'center',
    },
    logoContent: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    simpleLogoText: {
        color: '#000',
        fontSize: 51,
        marginLeft: 10
    },
    simpleLogoLabel: {
        color: SECONDARY_COLOR_HIGHT,
        fontSize: 18,
        textAlign: 'center'
    }
})

export default Styles