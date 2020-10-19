import React, { Component } from 'react';

// returns video player 

function VideoPlayer(props) {
    const video = props.video;
    return (
        <div>
            <h2>{video.title}</h2>
            <video width="500" controls>
                <source src={video.videoFile} type="video/mp4" />
            </video>
            <p>Description: {video.description}</p>
            <span>Video Likes: {video.likes} </span>
            <span> Video Disikes: {video.dislikes}</span>
            <hr />
        </div>
    )
}

export default VideoPlayer

