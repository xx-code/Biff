import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, 
         SECONDARY_COLOR_HIGHT, 
         ALERT_COLOR} from '../../config/colors';

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
        paddingLeft: 5
    },
    errors: {
        fontSize: 14,
        color: '#ed1c24'
    }
})

export default Styles