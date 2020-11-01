import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axiosInstance from '../axios';
import { processPayment } from './paymentHelper';
import { createSubscription } from './subscriptionHelper';
import Preloader from './utils/Preloader';
import formStyles from './css/forms.module.css';
import Popup from './utils/Popup';
import { useHistory } from 'react-router-dom';

const Payment = ({ plan_id, amount }) => {
	const history = useHistory();

	const [info, setInfo] = useState({
		success: false,
		clientToken: null,
		error: '',
		instance: {},
		message: `Your bill is ${amount}`,
	});

	const [showPopup, setShowPopup] = useState(false);
	const [paymentProcessing, setPaymentProcessing] = useState(false);

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
		// setting token null to hide drop in
		setInfo({
			...info,
			message: `Activating the subscription plan...`,
		});
		console.log('--------------');
		console.log(info);
		setPaymentProcessing(true);

		let nonce;
		let getNonce = info.instance
			.requestPaymentMethod()
			.then((data) => {
				console.log('MYDATA', data);
				nonce = data.nonce;
				const paymentData = {
					paymentMethodNonce: nonce,
				};
				console.log(paymentData);

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
								setShowPopup(true);
								setTimeout(() => history.push('/home'), 2000);
							})
							.catch((error) =>
								console.log('SUBSCRIPTION FAILED', error)
							);
					})
					.catch((error) => console.log('PAYMENT FAILED', error));
			})
			.catch((err) => console.log(err));
	};

	const showbtnDropIn = () => {
		return (
			<div>
				{info.clientToken !== null ? (
					!paymentProcessing ? (
						<div>
							<DropIn
								options={{ authorization: info.clientToken }}
								onInstance={(instance) =>
									(info.instance = instance)
								}
							></DropIn>
							<button
								onClick={onPurchase}
								className={formStyles.submitBtn}
								style={{ minWidth: '250px' }}
							>
								Buy Now
							</button>
						</div>
					) : (
						<div style={{ width: '100vw', height: '20vh' }}>
							<Preloader />
						</div>
					)
				) : (
					<div style={{ width: '100vw', height: '20vh' }}>
						<Preloader />
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			<Popup
				show={showPopup}
				message='New subscription activated!'
				type='success'
			/>
			<div>
				<h4 style={{ textAlign: 'center' }}>{info.message}</h4>
				{showbtnDropIn()}
			</div>
		</>
	);
};
export default Payment;
