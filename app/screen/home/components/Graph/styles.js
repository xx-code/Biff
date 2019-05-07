import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_LIGHT, 
         TEXT_SECONDARY_COLOR } from '../../../../config/colors';

const styles = StyleSheet.create({
    graph: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: SECONDARY_COLOR_LIGHT
    },
    title: {
        fontSize: 16,
        color: TEXT_SECONDARY_COLOR
    }
})

export default styles