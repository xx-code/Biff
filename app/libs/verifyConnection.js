import { NetInfo,
         ToastAndroid} from 'react-native';

const connected = async () => {

    let connect = false

    await NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected){
            connect = true
        } else {
            ToastAndroid.show('Aucune connexion internet', ToastAndroid.LONG);
        } 
    })

    return connect
}

export default connected