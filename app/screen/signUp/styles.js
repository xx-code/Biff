import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 35,
    },
    header: {
        flexDirection: 'row-reverse'
    },
    logo : {
        marginTop: 60,
        marginBottom: 40,
        alignItems: 'center',
    },
    input: {
        marginTop: 20
    },
    linkButton: {
        alignSelf : 'flex-end',
        marginBottom : 20
    },
    simpleButton: {
        marginVertical: 25
    },
    contentBtn: {
        alignItems: 'center'
    }
})

export default Styles