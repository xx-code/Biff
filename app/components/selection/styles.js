import { StyleSheet } from 'react-native';
import { TEXT_PRIMARY_COLOR, 
         SECONDARY_COLOR_HIGHT, 
         SECONDARY_COLOR_LIGHT,
         PRIMARY_COLOR } from '../../config/colors';

const styles = StyleSheet.create({
    ItemSimplePicker: {
        paddingVertical: 8,
        paddingLeft: 5
    },
    labelPicker: {
        fontSize: 20,
        color: SECONDARY_COLOR_HIGHT
    },
    label: {
        fontSize: 18,
        color: TEXT_PRIMARY_COLOR
    },
    simplePicker: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedPicker: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textSelectSimplePicker: {
        flex: 1,
        color: TEXT_PRIMARY_COLOR,
        fontSize: 18
    },
    simplePickerUnderLine: {
        paddingVertical: 0.8,
        backgroundColor: SECONDARY_COLOR_HIGHT,
        width: '100%'
    },
    hideView: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        elevation: 3
    },
    activeSingle: {
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 0.8,
        borderColor: PRIMARY_COLOR
    },
    activeSingleText: {
        fontSize: 18,
        color: SECONDARY_COLOR_LIGHT,
        textAlign: 'center'
    },
    inactiveSingle: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        borderWidth: 0.8,
        borderColor: SECONDARY_COLOR_HIGHT
    },
    inactiveSingleText: {
        fontSize: 18,
        color: PRIMARY_COLOR,
        textAlign: 'center'
    },
    singleSelect:{
        flexDirection: 'row',
        width: '100%'
    },
    itemSingleSelect: {
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1
    },
    icon: {
        marginRight: 8
    },
    textChangeSelect: {
        fontSize: 20,
        paddingHorizontal: 10
    }
})

export default styles