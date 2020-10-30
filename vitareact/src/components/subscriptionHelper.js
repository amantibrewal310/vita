import axiosInstance from '../axios';

export const createSubscription = (subscriptionInfo) => {
	const formData = new FormData();

	for (const name in subscriptionInfo) {
		formData.append(name, subscriptionInfo[name]);
	}

	return axiosInstance
		.post(`membership/create-subscription/`, formData)
		.then((res) => {
			console.log(res);
			console.log(res.data);
			if (res.data.success) {
				return res.data;
			}
		})
		.catch((error) => console.log(error));
};
