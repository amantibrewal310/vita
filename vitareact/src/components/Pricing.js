import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Payment from './Payment';

function Pricing({ title, price, isAvailable, handleChange }) {
	const history = useHistory();
	return (
		<React.Fragment>
			<div className='column'>
				<h3>{title}</h3>
				<p>${price}/month</p>
				{isAvailable && (
					<button className='btn btn-info' onClick={handleChange}>
						Buy Now
					</button>
				)}
			</div>
		</React.Fragment>
	);
}

export default Pricing;
