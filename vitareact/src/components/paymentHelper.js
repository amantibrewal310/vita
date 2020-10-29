// import { API } from '../../backend';
import axiosInstance from '../axios';
// export const getMeToken = () => {
// 	return fetch(`${API}payment/gettoken/`, {
// 		method: 'GET',
// 	})
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.catch((error) => console.log(error));
// };

export const processPayment = (paymentInfo) => {
	const formData = new FormData();

	for (const name in paymentInfo) {
		formData.append(name, paymentInfo[name]);
	}

	return axiosInstance
		.post(`payment/process/`, formData)
		.then((res) => {
			console.log(res);
			console.log(res.data);
			if (res.data.success) {
				return res.data;
			}
		})
		.catch((error) => console.log(error));
};
