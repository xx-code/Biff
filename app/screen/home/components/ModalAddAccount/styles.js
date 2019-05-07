import { StyleSheet } from 'react-native';
import { TRANSPARENT, SECONDARY_COLOR_LIGHT } from '../../../../config/colors';

const styles = StyleSheet.create({
    selectedColor: {
        borderColor: '#fff',
        borderWidth: 2,
        padding: 20,
        marginHorizontal: 12
    },
    unSelectedColor: {
        padding: 20,
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
        paddingVertical: 8,
        paddingHorizontal: 6,
        flexDirection: 'row-reverse'
    },
    inputField: {
        marginTop: 15
    },
    colorList: {
        marginTop: 8
    },
    buttonField: {
        justifyContent: 'center',
        marginVertical: 12,
    }
})

export default styles