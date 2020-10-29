import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axiosInstance from '../axios';
import { processPayment } from './paymentHelper';
import { createSubscription } from './subscriptionHelper';

const Payment = ({
	plan_id,
	amount,
	reload = undefined,
	setReload = (f) => f,
}) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: '',
		instance: {},
	});

	const getToken = () => {
		axiosInstance
			.get(`payment/gettoken/`)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					const clientToken = res.data.clientToken;
					setInfo({ clientToken });
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getToken();
	}, []);

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			console.log('MYDATA', data);
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
			};
			// Processing the payment
			processPayment(paymentData)
				.then((response) => {
					console.log('PAYMENT RESPONSE', response);

					// Creating the subscription
					const subscriptionData = {
						planID: plan_id,
						paymentMethodToken: response.paymentMethodToken,
					};
					console.log(subscriptionData);
					createSubscription(subscriptionData)
						.then((res) => {
							console.log('Subscribed', res);
						})
						.catch((error) =>
							console.log('SUBSCRIPTION FAILED', error)
						);
				})
				.catch((error) => console.log('PAYMENT FAILED', error));
		});
	};

	const showbtnDropIn = () => {
		return (
			<div>
				{info.clientToken !== null ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) =>
								(info.instance = instance)
							}
						></DropIn>
						<button
							onClick={onPurchase}
							className='btn btn-block btn-success'
						>
							Buy Now
						</button>
					</div>
				) : (
					<h3>Please login first or add something in cart</h3>
				)}
			</div>
		);
	};

	console.log(plan_id);

	return (
		<div>
			<h3>Your bill is $ {amount}</h3>
			{showbtnDropIn()}
		</div>
	);
};
export default Payment;
