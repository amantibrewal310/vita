import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import formStyles from './css/forms.module.css'
import subStyles from './css/subscription.module.css'

function Pricing({ title, price, isAvailable, handleChange }) {
	const history = useHistory();
	return (
		<React.Fragment>
			<div className={subStyles.plan}>
				<h3>{title}</h3>
				<p>${price}/month</p>
				{ 	(isAvailable) 
					? (
						<button className={formStyles.smallSubmitBtn} onClick={handleChange}>
							Buy Now
						</button>
					) : (
						<h5>This plan is active</h5>
					)
				}
			</div>
		</React.Fragment>
	);
}

export default Pricing;
