import { StyleSheet } from 'react-native';
import { TRANSPARENT, SECONDARY_COLOR_LIGHT } from '../../../../config/colors';

const styles = StyleSheet.create({
    selectedColor: {
        width: 35,
        marginVertical: 2,
        height: 35,
        marginHorizontal: 10
    },
    unSelectedColor: {
        width: 30,
        height: 30,
        marginHorizontal: 12
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: TRANSPARENT
    },
    content: {
        backgroundColor: SECONDARY_COLOR_LIGHT,
        marginHorizontal: 20,
        padding: 10
    },
    header: {
        paddingHorizontal: 6,
        flexDirection: 'row-reverse'
    },
    inputField: {
        marginTop: 15
    },
    colorList: {
        marginTop: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonField: {
        justifyContent: 'center',
        marginVertical: 12,
    }
})

export default styles