import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentLoading from './ContentLoading'
import ShowComments from './ShowComments';
import VideoPlayer from './VideoPlayer';

// Get video data for a particular video 
// Get all comments on the video

function GetVideo() {
    // video Id
    const {id} = useParams();
    const VideoLoading = ContentLoading(VideoPlayer);
    const CommentsLoading = ContentLoading(ShowComments);

    const [videoData, setVideoData] = useState({
        loading: true,
        video: null
    });
    const [commentsData, setCommentsData] = useState({
        loading: true,
        comments: null
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/video-list/${id}/`)
            .then(res => {
                setVideoData({
                    loading:false,
                    video:res.data
                });
            })
            .catch(err => {
                console.log('error in video data: ' + err);
            });

        
    }, [setVideoData]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/video/${id}/comments/`)
            .then(res => {
                setCommentsData({
                    loading:false,
                    comments:res.data
                });
            })
            .catch(err => {
                console.log('error in comment data: ' + err);
            });
    }, [setCommentsData])

    // TODO:
    // display a sidebar with video-list like youtube
    return (
        <div className=''>
            <VideoLoading 
                isLoading={videoData.loading} 
                video={videoData.video} 
            />
            <CommentsLoading 
                isLoading={commentsData.loading}
                comments={commentsData.comments}
            />
        </div>
    )
}

export default GetVideo
