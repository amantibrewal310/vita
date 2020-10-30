import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './Subscription.css';
import axiosInstance from '../axios';
import Payment from './Payment';
import Pricing from './Pricing';

const Subscription = () => {
	const [flag, setFlag] = useState(true);
	const [memberships, setMemberships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [plainID, setPlainID] = useState('');
	const [amount, setAmount] = useState(0);

	const [currentMembershipType, setCurrentMembershipType] = useState('');

	useEffect(() => {
		axiosInstance
			.get(`membership/type/`)
			.then((res) => {
				console.log(res);
				setLoading(false);
				setMemberships(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		axiosInstance
			.get(`membership/user/type/`)
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				setCurrentMembershipType(res.data.membership_type);
			})
			.catch((err) => console.log(err));
	}, []);
	// useEffect(() => {
	// 	if (!flag) {
	// 		setPlainID(plainID);
	// 	}
	// });
	console.log(memberships);
	console.log(plainID);
	return (
		<React.Fragment>
			<section className='container'>
				<h1 className='text-center'>Pricing</h1>
				<div className='row'>
					{flag ? (
						memberships.map((type) => (
							// console.log(type);
							<Pricing
								key={type.id}
								title={type.memebership_type}
								price={type.price}
								isAvailable={
									true &&
									type.memebership_type !==
										currentMembershipType
								}
								handleChange={() => {
									console.log(type.braintree_plan_id);
									setPlainID(type.braintree_plan_id);
									setAmount(type.price);
									setFlag(false);
								}}
							/>
						))
					) : (
						<Payment plan_id={plainID} amount={amount} />
					)}
				</div>
			</section>
		</React.Fragment>
	);
};

export default Subscription;
