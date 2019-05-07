import React, {Component} from 'react';
import { View,
         ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SimpleLogo } from '../../components/logo';
import { HighInput } from '../../components/input';
import { SimpleButton,
         LinkButton } from '../../components/button';
import firebase from 'react-native-firebase';
import verifyConnection from '../../libs/verifyConnection';
import verify from '../../libs/verifySignIn';
import styles from './styles';

class SignIn extends Component{

    state = {
        email : '',
        password : '',
        errors : {},
        loading : false
    }

    unsubcribe = null;

    componentDidMount(){
        SplashScreen.hide();
        this.unsubcribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const { navigation } = this.props;
                navigation.navigate('Home');
            }
        })

    }

    componentWillMount(){
        if(this.unsubcribe){
            this.unsubcribe();
        }
    }
    handleText = (text, name) => {
        this.setState({[name] : text})
    }

    signUp = () => {
        const { navigation } = this.props;
        navigation.navigate('SignUp');
    }

    signIn = async () => {
        const { email,
                password } = this.state;
        
        const { navigation } = this.props;

        const isConnected = await verifyConnection();
        this.setState({loading: true});
        
        if(isConnected){
            const {isValid, errors} = verify(this.state);
            
            if(isValid){
                firebase.auth().signInWithEmailAndPassword(email.replace(/\s/g, ''), password).then(user => {
                    this.setState({loading: false});
                    navigation.navigate('Home');
                }).catch(err => {
                    let { code } = err;
                    let errors = {};
    
                    if(code === 'auth/invalid-email')
                        errors.email = "L'adresse email est invalide";
                    
                    if(code === 'auth/user-not-found')
                        errors.email = "L'adresse email est invalide";
    
                    if(code === 'auth/wrong-password')
                        errors.password = "le mot de passe est incorrect";
                    
                    this.setState({errors : errors, loading : false});
                })
            } else {
                this.setState({loading: false, errors: errors})
            }

        } else {
            this.setState({loading: false})
        }
    }

    render(){

        const { email,
                password,
                errors } = this.state;
        
        return(
            <View style = {styles.container}>
                <SimpleLogo style = {styles.logo} />
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} >
                    <View>
                        <HighInput
                            style = {styles.input}
                            name = "email"
                            label = "Email"
                            onChangeText = {this.handleText}
                            value = {email}
                            autoCapitalize = "none"
                            error = {errors.email}
                        />
                        <HighInput
                            style = {styles.input}
                            name = "password"
                            label = "Mot de passe"
                            onChangeText = {this.handleText}
                            value = {password}
                            secureTextEntry
                            autoCapitalize = "none"
                            error = {errors.password} 
                        />
                    </View>
                    <View style = {styles.contentBtn}>
                        <SimpleButton
                            style = {styles.simpleButton}
                            label = "CONNEXION"
                            onPress = {this.signIn}
                        /> 
                        <LinkButton
                            style = {styles.linkButton}
                            label = "Créé un compte"
                            onPress = {this.signUp}
                        />
                    </View>
                </KeyboardAwareScrollView> 
            </View>
        )
    }
}

export default SignIn