import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_LIGHT, 
         RED_COLOR } from '../../config/colors';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY_COLOR_LIGHT,
        paddingHorizontal: 20
    },
    inpView: {
        marginTop: 18
    },
    buttonView: {
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cutView: {
        width: '50%',
        marginTop: 10
    },
    cutViewPicker: {
        width: '70%',
        marginTop: 10
    },
    description: {
        marginTop: 10
    },
    viewTime: {
        flexDirection: 'row',
        marginTop: 10
    },
    inputTime: {
        flex: 1,
        marginLeft: 8
    },
    inputDate: {
        flex: 1
    },
    errors: {
        fontSize: 14,
        color: RED_COLOR
    }
})

export default Styles