import React, { useEffect, useState } from 'react';
import Header from '../Header';
import '../css/table.css';
import { getVideosList } from '../../request';
import { useHistory } from 'react-router-dom';

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
							<th>Title</th>
							<th>Operations</th>
						</tr>
					</thead>
					{videos.map((video, index) => (
						<tbody key={video.id}>
							<tr>
								<td>{index + 1}</td>
								<td>{video.title}</td>
								<td>
									<button
										className='btn btn-info'
										onClick={() => {
											history.push(
												`/preplay/${video.id}`
											);
										}}
										// style={{ float: 'right' }}
									>
										View
									</button>
									<button
										className='btn btn-info'
										// style={{ float: 'right' }}
										onClick={() => {
											history.push(
												`/admin/video-details/${video.id}`
											);
										}}
									>
										Edit
									</button>
									<button
										className='btn btn-danger'
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
