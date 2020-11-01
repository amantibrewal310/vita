import axios from 'axios';
import axiosInstance from './axios';
import { API } from './Backend';

export const getCategoriesList = () => {
	return axios
		.get(`${API}video/categories/`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getVideosList = () => {
	return axios
		.get(`${API}video/video-list/`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export async function getCategoryVideos(id) {
	return await axios
		.get(`${API}videos/?category=${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => console.log(error));
}

export const getCategoryName = (id) => {
	return axios
		.get(`${API}video/categories/${id}/`)
		.then((res) => {
			let category = res.data.category;
			category = category.charAt(0).toUpperCase() + category.slice(1);
			return category;
		})
		.catch((error) => console.log(error));
};

export async function GetVideosInList(id) {
	return await axiosInstance.get(`video/watchlist/${id}/`);
}

export const getAllMembershipsType = () => {
	return axiosInstance
		.get(`membership/type/`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.log(err));
};

export const getAllReportedVideos = () => {
	return axiosInstance
		.get(`video/reported-video-list/`)
		.then((res) => {
			console.log(res);
			return res.data;
			console.log(res.data);
			// setVideoResLoadingLoading(false);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getAllUserMembership = () => {
	return axiosInstance
		.get('membership/user-membership/')
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.log(err));
};

export const getReportReason = () => {
	return axios
		.get(`http://127.0.0.1:8000/api/video/report-reason/`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => console.log(error));
};
