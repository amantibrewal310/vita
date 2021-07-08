import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './css/widget.module.css';
import formStyles from './css/forms.module.css';
function Widget(props) {
	const history = useHistory();
	return (
		<div className={style.widgetWrap}>
			<div className={style.widgetTitle}>{props.title}</div>
			<div className={style.widgetValue}>
				<div className={style.value}>{props.value}</div>
				<div className={style.description}>{props.description}</div>
				{props.buttonName && (
					<button
						className={formStyles.btn}
						onClick={() => {
							history.push(props.buttonPath);
						}}
					>
						{props.buttonName}
					</button>
				)}
			</div>
		</div>
	);
}

export default Widget;
