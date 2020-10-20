import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentLoading from './ContentLoading'
import CommentList from './CommentList';
import VideoPlayer from './VideoPlayer';

// Get video data for a particular video 
// Get all comments on the video

function GetVideo() {
    // video Id
    const {id} = useParams();
    const VideoLoading = ContentLoading(VideoPlayer);
    const CommentsLoading = ContentLoading(CommentList);

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

        
    }, [])  ;

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
    }, [])

    // TODO:
    // display a sidebar with video-list like youtube
    return (
        <div className=''>
            {/* Returns a component with video players and video details */}
            <VideoLoading 
                isLoading={videoData.loading} 
                video={videoData.video} 
            />
            {/* TODO
                - User able to 
                    - Report video
                - Admin 
                    - hide report button 
            */}
            {/* Returns comment list for this video */}
            <CommentsLoading 
                isLoading={commentsData.loading}
                comments={commentsData.comments}
            />
            {/* TODO:
                - User should be able to 
                    - add comment, additional(/edit/delete)
                    - Report comment 
                - Admin 
                    - hide add commet, report, add link to /admin/comment-detail/:id
            */}
        </div>
    )
}

export default GetVideo
