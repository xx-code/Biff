import React, {Component} from 'react';
import { View } from 'react-native';
import { createStackNavigator, 
         createSwitchNavigator,
         createMaterialTopTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignIn from '../screen/signIn';
import SignUp from '../screen/signUp';
import Home from '../screen/home';
import Goals from '../screen/goals';
import Budget from '../screen/budget';
import AddRecord from '../screen/addRecord';
import Transfert from '../screen/transfert';
import AllRecords from '../screen/allRecords';
import firebase from 'react-native-firebase';
import Profile from '../components/profile';
import { SECONDARY_COLOR_LIGHT, SECONDARY_COLOR, PRIMARY_COLOR } from './colors';

const AppNavigator = createSwitchNavigator(
    {
        Sign : createStackNavigator({
            SignIn : {
                screen : SignIn,
                navigationOptions : () => ({
                    header : null
                })
            },
            SignUp : {
                screen : SignUp,
                navigationOptions : () => ({
                    header : null
                })
            }
        },{ initialRouteName: 'SignIn'}),
        Dashboard: createStackNavigator({
            Main: {
                screen: createMaterialTopTabNavigator({
                    Home: {
                        screen: Home,
                        navigationOptions:{
                            tabBarLabel : 'Dashboard',
                            tabBarTestID: 'Home',
                            tabBarIcon : ({tintColor}) => <Icon  name = "tachometer-alt" 
                                                            size = {22}
                                                            color = {tintColor}
                                                        />
                        }
                    },
                    Budget:{
                        screen: Budget,
                        navigationOptions: {
                            tabBarLabel : 'Budget',
                            tabBarTestID: 'Budget',
                            tabBarIcon : ({tintColor}) => <Icon  name = "credit-card" 
                                                            size = {22}
                                                            color = {tintColor}
                                                            />
                        }
                    },
                    goals:{
                        screen: Goals,
                        navigationOptions: {
                            tabBarLabel : 'Goals',
                            tabBarTestID: 'Goals',
                            tabBarIcon : ({tintColor}) => <Icon  name = "piggy-bank" 
                                                            size = {22}
                                                            color = {tintColor}
                                                            />
                        }
                    }
                },{
                    initialRouteName: 'Home',
                    swipeEnabled: false,
                    tabBarOptions: {
                        activeTintColor: SECONDARY_COLOR_LIGHT,
                        inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                        upperCaseLabel: false,
                        indicatorStyle: {
                            backgroundColor: PRIMARY_COLOR,
                        },
                        style:{
                            backgroundColor: PRIMARY_COLOR,
                            color: SECONDARY_COLOR_LIGHT,
                            elevation: 0
                        },
                        showIcon: true,
                        showLabel: true
                    },
                    navigationOptions : () => ({
                        header: () =>{
                            return(
                                <View style = {{backgroundColor: PRIMARY_COLOR, paddingVertical: 8, alignItems: 'center'}}>
                                    <Profile />
                                </View>
                            )
                        }
                    })
                })
            },
            AddRecord: {
                screen: AddRecord,
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: PRIMARY_COLOR,
                        elevation: 0
                    },
                    headerTintColor: SECONDARY_COLOR_LIGHT
                }
            },
            Transfert: {
                screen: Transfert,
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: PRIMARY_COLOR,
                        elevation: 0
                    },
                    headerTintColor: SECONDARY_COLOR_LIGHT
                }
            },
            AllRecords: {
                screen: AllRecords,
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: PRIMARY_COLOR,
                        elevation: 0
                    },
                    headerTintColor: SECONDARY_COLOR_LIGHT
                }
            }
        },
        {
            initialRouteName: 'Main'
        }) 
    },
    {
        initialRouteName: !firebase.auth().currentUser ? 'Sign' : 'Dashboard'
    }
)

export default AppNavigator