import React, { useEffect, useState } from 'react';
import Header from '../Header';
import '../css/table.css';
import { getVideosList } from '../../request';
import { useHistory } from 'react-router-dom';
import formStyles from '../css/forms.module.css'

function VideosList() {
	const history = useHistory();
	const [videos, setvideos] = useState([]);

	useEffect(() => {
		getVideosList().then((res) => {
			setvideos(res);
		});
	}, []);
	console.log(videos);
	return (
		<>
			<Header />
			<div style={{ height: '60px' }}></div>
			<h1 className='text-center'>Videos List</h1>
			<div className='container'>
				<table className='container'>
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Thumbnail</th>
							<th>Title</th>
							<th>Operations</th>
						</tr>
					</thead>
					{videos.map((video, index) => (
						<tbody key={video.id}>
							<tr>
								<td>{index + 1}</td>
								<td>
									<img src={video.thumbnail} width="60px" alt="img"/>
								</td>
								<td>{video.title}</td>
								<td>
									<button
										className={formStyles.smallSubmitBtn}
										onClick={() => {
											history.push(
												`/preplay/${video.id}`
											);
										}}
										style={{margin: '5px'}}
									>
										View
									</button>
									<button
										className={formStyles.smallSubmitBtn}
										onClick={() => {
											history.push(
												`/admin/video-details/${video.id}`
											);
										}}
										style={{margin: '5px'}}
									>
										Edit
									</button>
									<button
										className={formStyles.smallDangerBtn}
										// style={{ float: 'right' }}
									>
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</>
	);
}

export default VideosList;
