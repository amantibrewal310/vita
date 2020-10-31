import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import style from '../components/css/row.module.css';
import { getCategoryVideos } from '../request';
function CategoryRow(props) {
	const history = useHistory();
	const { heading, id } = props;
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		getCategoryVideos(id).then((res) => {
			setVideos(res);
		});
	}, [id]);

	/* 
        set [to] in Link based on user logged in status, 
        if not logged int set [to] => same page 
    */
	// console.log(props.heading);
	if (!videos) {
		return <></>;
	}
	return (
		<div className={style.row}>
			<h1>{heading}</h1>
			<div className={style.row_posters}>
				{videos.map((video) => {
					// console.log('category', video);
					return (
						// <Link key={video.id} to={`preplay/${video.id}`}>
						<img
							key={video.id}
							className={style.row_poster}
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

export default CategoryRow;
