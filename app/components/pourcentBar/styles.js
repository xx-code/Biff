import { StyleSheet } from 'react-native';
import { SECONDARY_COLOR_HIGHT } from '../../config/colors';
const styles = StyleSheet.create({
    circleBar: {
        borderColor: SECONDARY_COLOR_HIGHT,
        width: '100%',
        borderRadius: 8,
        borderWidth: 0.8
    },
    insideCircle: {
        paddingVertical: 5,
        borderRadius: 8
    }
})

export default styles