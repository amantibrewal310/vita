import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import style from '../components/css/row.module.css';


function VideoList(props) {
	const history = useHistory();
	// console.log(props);
	const videoList = props.videoList;
	if (!videoList) {
		return <div>No videos available</div>;
	}

	/* 
        set [to] in Link based on user logged in status, 
        if not logged int set [to] => same page 
    */
	// console.log(props.heading);
	return (
		<div className={style.row}>
			<h2>{props.heading}</h2>
			<div className={style.row_posters}>
				{videoList.map((video) => {
					return (
						// <Link key={video.id} to={`preplay/${video.id}`}>
						<img
							key={video.id}
							className={`${style.row_poster} ${
								props.isLargeRow && style.row_posterLarge
							}`}
							src={video.thumbnail}
							alt={video.title}
							onClick={() => {
								console.log('--');
								history.push(`preplay/${video.id}`);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default VideoList;
