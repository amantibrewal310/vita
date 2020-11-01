import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from './components/VideoList';
import { API } from './Backend';
import { getCategoriesList, getCategoryVideos, getVideosList } from './request';
import Banner from './components/Banner';
import CategoryRow from './components/CategoryRow';
import Header from './components/Header';
import Preloader from './components/utils/Preloader';


function App() {
	const [appState, setAppState] = useState({
		loading: true,
		videoList: []
	});
	const [catState, setCatState] = useState({
		loading: true,
		categories: []	
	})

	// Don't use the axiosInstance from './axios'
	// since it sends a bearer token null with it when user is not authenticated
	// and so videos are not fetched, and invalid_token error is genreated
	useEffect(() => {
		getVideosList().then((res) => {
			setAppState({
				loading: false,
				videoList: res || [],
			});
		});
	}, [setAppState]);
	useEffect(() => {
		getCategoriesList().then((res) => {
			setCatState({
				loading: false,
				categories: res || []
			})
		});
	}, []);

	return (
		<React.Fragment>
			<Header/>
			<Banner />
			{
				(appState.loading)
				? (
					<Preloader />
				) : (
					<VideoList
						heading={'Latest Videos'}
						videoList={appState.videoList}
						isLargeRow={true}
					/>
				)
			}
			{
				(catState.loading)
				? (
					<div style={{width: '100vw', height: '50vh'}}>
						<Preloader />
					</div>
				) : (
					catState.categories.map((category) => {
						return (
							<CategoryRow
								key={category.id}
								heading={category.category}
								id={category.id}
							/>
					)}
				)
			)
			}
		</React.Fragment>
	);
}

export default App;
