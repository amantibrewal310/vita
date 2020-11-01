import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import checkLoggedIn from './auth/checkLoggedIn';
import axiosInstance from '../axios';
import GetAllWatchList from './Watchlist/GetAllWatchList';
import Preloader from './utils/Preloader';
import Header from './Header';
import Subscription from './Subscription';
import formStyles from './css/forms.module.css';
import profileStyle from './css/profile.module.css';
import UseAvatar from './UserAvatar';

function UserProfile() {
	// init user data
	const userInit = {
		username: '',
		id: '',
		email: '',
		about: '',
		first_name: '',
	};
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(userInit);
	const history = useHistory();
	const [planDetails, setPlanDetails] = useState({
		show: false,
		text: 'Show',
	});

	useEffect(() => {
		if (checkLoggedIn()) {
			const userEmail = localStorage.getItem('email');
			axiosInstance.get(`user/byemail/${userEmail}/`).then((res) => {
				// TODO:
				// check if valid user is retured
				setUser({
					...user,
					username: res.data.username,
					id: res.data.id,
					email: res.data.email,
					about: res.data.about,
					first_name: res.data.first_name,
				});
				setLoading(false);
			});
		}
	}, [setUser]);

	const handleShowDetails = () => {
		if (planDetails.show) {
			setPlanDetails({
				show: false,
				text: 'Show',
			});
		} else {
			setPlanDetails({
				show: true,
				text: 'Hide',
			});
		}
	};

	// TODO:
	// forms for profile update

	if (checkLoggedIn()) {
		return (
			<>
				<Header />
				<div style={{ height: '60px' }}></div>
				<div>
					{!loading ? (
						<div className={profileStyle.profContainer}>
							<div className={profileStyle.avatarContainer}>
								<UseAvatar letter={user.username.charAt(0)} />
							</div>

							<h1>@{user.username}</h1>
							<p>
								<i
									className='fa fa-envelope-open-text'
									style={{ margin: '6px' }}
								></i>
								{user.email}
							</p>
							{/* <h2>Hi {user.first_name}, How are you today?</h2> */}
							{/* <p>About: {user.about}</p> */}
						</div>
					) : (
						<div style={{ width: '100vw', height: '25vh' }}>
							<Preloader />
						</div>
					)}
					<div className={formStyles.buttonBox}>
						<button
							style={{ width: '230px' }}
							className={
								!planDetails.show
									? formStyles.smallSubmitBtn
									: formStyles.smallDangerBtn
							}
							onClick={handleShowDetails}
						>
							{`${planDetails.text} Subscription Details`}
						</button>
					</div>

					{planDetails.show ? (
						<Subscription messageToUser='Subscription Plans' />
					) : (
						<></>
					)}

					<div className={profileStyle.watchlistContainer}>
						<h2>Your Watchlists</h2>
						<GetAllWatchList userId={user.id} />
					</div>
				</div>
			</>
		);
	}

	history.push('/');
	return <></>;
}

export default UserProfile;
