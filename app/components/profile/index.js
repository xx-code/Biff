import React, {Component} from 'react';
import { View } from 'react-native';
import img from '../../image/blankProfile.png';
import Menu from './Menu';
import ProfileImg from './ImgTouch';
import styles from './styles';

/**
 * 
 * @param style object
 */
class Profile  extends Component{

    state = {
        menus: [],
        showMenu: false
    }

    UNSAFE_componentWillMount(){
        this.setState({
            menus:[
                {
                    key: '0',
                    text: 'Profile',
                    click: () => {},
                    barEnd: true
                },
                {
                    key: '1',
                    text: 'BackUp',
                    click: () => {},
                    barEnd: true
                },
                {
                    key: '2',
                    text: 'Deconnexion',
                    click: () => {},
                    barEnd: false
                }
            ]
        })
    }


    render(){

        const { style,
                menus,
                showMenu } = this.state;

        return(
            <View style = {style}>
                <ProfileImg
                    img = {img}
                    onPress = {() => this.setState({showMenu: true})} 
                />
                <Menu
                    back = {() => this.setState({showMenu: false})}
                    show = {showMenu}
                    menuItems = { menus }
                />
            </View>
        )
    }   
}

export default Profile