import React from 'react';
import style from './css/widget.module.css';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function WidgetBar(props) {
	// Create a JSON object to store the chart configurations
	const chartConfigs = {
		type: 'bar2d', // The chart type
		width: '75%', // Width of the chart
		height: '225', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: 'Countries With Most Oil Reserves [2017-18]', //Set the chart caption
				subCaption: 'In MMbbl = One Million barrels', //Set the chart subcaption
				xAxisName: 'Country', //Set the x-axis name
				yAxisName: 'Reserves (MMbbl)', //Set the y-axis name
				numberSuffix: 'K',
				bgColor: '#2a2a2a',
				theme: 'fusion', //Set the theme for your chart
			},
			// Chart Data - from step 2
			data: props.data,
		},
	};
	return (
		<div className={style.widgetWrap}>
			<div className={style.widgetTitle}>{props.title}</div>
			<div className={style.widgetValue}>
				<ReactFC {...chartConfigs} />
			</div>
		</div>
	);
}

export default WidgetBar;
