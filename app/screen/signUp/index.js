import React, {Component} from 'react';
import { View,
         Text } from 'react-native';
import { SimpleLogo } from '../../components/logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PRIMARY_COLOR } from '../../config/colors';
import { IconButton,
         SimpleButton } from '../../components/button';
import { HighInput } from '../../components/input';
import firebase from 'react-native-firebase';
import verifyConnection from '../../libs/verifyConnection';
import verify from '../../libs/verifySignUp';
import styles from './styles';

class SignUp extends Component{
    state = {
        email : '',
        password : '',
        password2 : '',
        loading: false,
        errors: {}
    }

    handleText = (text, name) => {
        this.setState({[name] : text})
    }

    signUp = async () => {
        const { email,
                password } = this.state;

        const { navigation } = this.props;
        
        const isConnected = await verifyConnection();
        this.setState({loading: true});
        
        if(isConnected){
            const {isValid, errors} = verify(this.state);
            
            if(isValid){
                firebase.auth().createUserWithEmailAndPassword(email.replace(/\s/g, ''), password).then(user => {
                    this.setState({loading: false});
                    navigation.navigate('SignIn');
                }).catch(err => {
                    let { code } = err;
                    let errors = {};

                    if(code === 'auth/email-already-in-use')
                        errors.email = "L'adresse email existe déjà";

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
                password2,
                errors } = this.state;
        
        const { navigation } = this.props;

        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <IconButton
                        size = {24}
                        color = {PRIMARY_COLOR}
                        icon = "md-close"
                        onPress = {() => navigation.goBack()} 
                    />
                </View>
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
                        <HighInput
                            style = {styles.input}
                            name = "password2"
                            label = "Confirmez le mot de passe"
                            onChangeText = {this.handleText}
                            value = {password2}
                            secureTextEntry
                            autoCapitalize = "none"
                            error = {errors.password2} 
                        />
                    </View>
                    <View style = {styles.contentBtn}>
                        <SimpleButton
                            style = {styles.simpleButton}
                            label = "INSCRIPTION"
                            onPress = {this.signUp}
                        /> 
                    </View>
                </KeyboardAwareScrollView> 
            </View>
        )
    }
}

export default SignUp