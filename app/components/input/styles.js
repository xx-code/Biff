import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_HIGHT, 
         ALERT_COLOR,
         TEXT_PRIMARY_COLOR,
         RED_COLOR} from '../../config/colors';

const Styles = StyleSheet.create({
    labelHigh : {
        color : PRIMARY_COLOR,
        fontSize : 16
    },
    HighInput : {
        color : SECONDARY_COLOR_HIGHT,
        borderWidth : 1,
        paddingLeft : 8
    },
    error: {
        fontSize : 13,
        color: ALERT_COLOR
    },
    simpleInput: {
        
    },
    simpleInputLabel: {
        fontSize: 20,
        color: SECONDARY_COLOR_HIGHT
    },
    simpleInputField: {
        paddingLeft: 5,
        color: TEXT_PRIMARY_COLOR
    },
    errors: {
        fontSize: 14,
        color: RED_COLOR
    }
})

export default Styles