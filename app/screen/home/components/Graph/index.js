import React from 'react';
import { View,
         Text } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import Chart from './Chart';
import styles from './styles';

/**
 * 
 * @param style object
 * @param chart string(Pie or Bar)
 * @param data array for specifique type Pie or Bar
 * @param width number 
 * @param chartConfig object 
 * @param title string
 * @param width number
 * @param height number
 * @param svg ojbect
 * @param labelSvg object
 * @param label array of label
 */
const Graph = props => {

    const { style, 
            chart,
            data,
            height,
            width,
            labelSvg,
            label,
            title,
            svg, 
            contentInset} = props;

    return(
        <View style = {[style, styles.graph]}>
            <Text style = {styles.title}>{title}</Text>
            <Chart
                chart = {chart}
                data = {data} 
                height = {height}
                width = {width}
                contentInset = {contentInset}
                svg = {svg}
                labelSvg = {labelSvg}
                label = {label}
            />
        </View>
    )
}

export default Graph