import React from 'react';
import { View, 
         FlatList } from 'react-native';
import { RipButton } from '../../../../components/button';
import Line from './Line';
import Header from './Header';
import styles from './styles';


/**
 * 
 * @param style object
 * @param data array 
 * @param handleClickItem function(key)
 * @param handleClickMore function 
 * @param title string
 * @param icon string
 * @param color color string of each bar
 */
const StatResume = props => {

    const { style,
            data,
            color,
            title,
            icon,
            handleClickMore,
            handleClickItem } = props;

    return(
        <View style = {[style, styles.statResume]}>
            <Header 
                style = {styles.header}
                icon = {icon}
                color = {color}
                title = {title}
                handleClickMore = {handleClickMore} 
            />
            <FlatList
                data = {data}
                horizontal = {false}
                renderItem = {({item, index}) => <Line
                                                    key = {item.key} 
                                                    label = {item.label}
                                                    color = {color}
                                                    total = {item.total}
                                                    acheived = {item.acheived}
                                                 />
                             }
            />
            <View style = {styles.bottomStat}>
                <RipButton
                    text = "Ajouter"
                    onPress = {() => {}} 
                />
            </View>
        </View>
    )
}

export default StatResume