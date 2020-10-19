import React from 'react';
import {Link} from 'react-router-dom';


function VideoList(props) {
    const videoList = props.videoList;
    if(!videoList) {
        return <div>No videos available</div>
    }

    return (
        <div>
        {
            videoList.map(video => (
                <Link key={video.id} to={`play/${video.id}`} >
                    <div>
                        <img src={video.thumbnail} width="200px" alt="thumbnail"/>
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                        <p>Likes: {video.likes}</p>
                        <p>Disikes: {video.dislikes}</p>
                        <hr />
                    </div>
                </Link>
            ))
        }
        </div>
    )
}

export default VideoList
