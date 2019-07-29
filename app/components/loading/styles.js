import { StyleSheet } from "react-native";
import { TRANSPARENT } from "../../config/colors";

const styles = StyleSheet.create({
    imageLoading: {
        width: 50,
        height: 50
    },
    back: {
        alignItems: 'center', 
        justifyContent: 'center',
        width:'100%',
        height:'100%',
        backgroundColor: TRANSPARENT
    }
})


export default styles