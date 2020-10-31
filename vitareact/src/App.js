import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentLoading from './components/ContentLoading';
import VideoList from './components/VideoList';
import { API } from './Backend';
import { getCategoriesList, getCategoryVideos, getVideosList } from './request';
import Banner from './components/Banner';
import CategoryRow from './components/CategoryRow';
function App() {
	const VideoListLoading = ContentLoading(VideoList);
	const [appState, setAppState] = useState({
		loading: true,
		videoList: null,
	});
	const [categories, setCategories] = useState([]);

	// Don't use the axiosInstance from './axios'
	// since it sends a bearer token null with it when user is not authenticated
	// and so videos are not fetched, and invalid_token error is genreated
	useEffect(() => {
		getVideosList().then((res) => {
			setAppState({
				loading: false,
				videoList: res,
			});
		});
	}, [setAppState]);
	useEffect(() => {
		getCategoriesList().then((res) => {
			setCategories(res);
		});
	}, []);

	return (
		<React.Fragment>
			{/* <h1>Latest Vidoes</h1> */}
			{/* TODO: 
                search box
            */}
			<Banner />
			<VideoListLoading
				heading={'Latest Videos'}
				isLoading={appState.loading}
				videoList={appState.videoList}
				isLargeRow={true}
			/>
			{categories.map((category) => {
				return (
					<CategoryRow
						key={category.id}
						heading={category.category}
						id={category.id}
					/>
				);
			})}
		</React.Fragment>
	);
}

export default App;
