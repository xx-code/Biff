import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_LIGHT,
         SECONDARY_COLOR_HIGHT,
         TEXT_PRIMARY_COLOR } from '../../config/colors';

const Styles = StyleSheet.create({
    simpleButton : {
        backgroundColor : PRIMARY_COLOR,
        paddingHorizontal : 45,
        paddingVertical : 12,
        borderRadius: 20
    },
    simpleButtonText : {
        fontSize : 16,
        color : SECONDARY_COLOR_LIGHT,
        textAlign: 'center'
    },
    linkButton : {
        padding : 6
    },
    linkButtonText : {
        color : PRIMARY_COLOR,
        textDecorationLine : 'underline'
    },
    iconButton: {
        padding: 10
    },
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: SECONDARY_COLOR_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderRadius: 100
    },
    ripButton: {
        backgroundColor: SECONDARY_COLOR_HIGHT,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    },
    ripText: {
        textAlign: 'center',
        color: TEXT_PRIMARY_COLOR
    }
})

export default Styles