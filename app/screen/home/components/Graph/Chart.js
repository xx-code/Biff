import React from 'react';
import { View } from 'react-native';
import { BarChart, XAxis, PieChart } from 'react-native-svg-charts'
import styles from './styles';

const Chart = props => {

    const { chart,
            data, 
            height,
            width,
            contentInset,
            svg,
            labelSvg,
            label } = props;

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

    const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }));

    if (chart === "Pie") {
        return(
            <View>
                <PieChart
                    style = {{height: height}}
                    data = {pieData}
                />
            </View>
        )
    } else if (chart === 'Bar') {
        return(
            <View>
                <BarChart
                    data = {data}
                    svg = {svg}
                    style = {{ height: height, 
                               width: width}}
                    contentInset = {{top: 10, bottom: 10}}
                />
                <View>
                    <XAxis
                        //style={{ marginHorizontal: -10 }}
                        data={ data }
                        //xAccessor={(value, index) => ({item: value, index: index})}
                        formatLabel={ (value, index) => index }
                        contentInset={{ left: 10, right: 10 }}
                        svg={labelSvg}
                    />
                </View>
            </View>
            
        )
    }
}

export default Chart