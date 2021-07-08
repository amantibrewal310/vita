import React from 'react';
import style from './css/widget.module.css';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function WidgetBar(props) {
	// console.log('Widget Bar', props);
	// Create a JSON object to store the chart configurations
	const chartConfigs = {
		type: 'bar2d', // The chart type
		width: '100%', // Width of the chart
		height: '225', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: props.title, //Set the chart caption
				xAxisName: props.xAxisName, //Set the x-axis name
				yAxisName: props.yAxisName, //Set the y-axis name
				bgColor: 'transparent',
				theme: 'fusion', //Set the theme for your chart
			},
			// Chart Data - from step 2
			data: props.data,
		},
	};
	return (
		<ReactFC {...chartConfigs} />

		// <div className={style.widgetWrap}>
		// 	<div className={style.widgetTitle}>{props.title}</div>
		// 	<div className={style.widgetValue}>
		// 	</div>
		// </div>
	);
}

export default WidgetBar;
