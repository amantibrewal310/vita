import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import VideoPlayer from './VideoPlayer';
import AddComments from './AddComment';
import checkAdminLoggedIn from './auth/checkAdminLoggedIn';
import detailStyle from './css/videoDetails.module.css';
import Preloader from './utils/Preloader';

// Get video data for a particular video 
// Get all comments on the video

function GetVideo() {
    // video Id
    const {id} = useParams();

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


    // method to add new comment to the comments array 
    // this is passed as prop to the Addcomment component
    const addCommentToList = (newComment) => {
        setCommentsData({
            comments: [newComment, ...commentsData.comments],
            loading: false
        });
    } 


    // TODO:
    // display a sidebar with video-list like youtube
    return (
        <div>
            {/* Returns a component with video players and video details */}
            {
                (videoData.loading)
                ? (
                    <div style={{width: '100vw', height: '70vh'}}>
                        <Preloader />
                    </div>
                )
                : (
                    <VideoPlayer video={videoData.video} />
                )
            }
            {/* TODO
                - User able to 
                    - Report video
                - Admin 
                    - hide report button 
            */}
            {/* TODO:
                hide Add comments component when logged int user is admin 
            */}
            <div className={detailStyle.videoDetailContainer}>
                <h4>Comments</h4>
                <AddComments 
                    videoId={id} 
                    addCommentToList={addCommentToList} 
                />
                {
                    (commentsData.loading)
                    ? (
                        <div style={{width: '100vw', height: '12vh'}}>
                            <Preloader />
                        </div>
                    )
                    : (
                        <CommentList 
                            comments={commentsData.comments}
                            videoId={id}
                        />
                    )
                }
            </div>
            {/* TODO:
                - User should be able to 
                    - add comment, additional(/edit/delete)
                    - Report comment 
                - Admin 
                    - hide add commet, report, add link to /admin/comment-detail/:id
            */}
            {/* 
                TODO: 
                - Similar movies horizontal bar 
             */}
        </div>
    )
}

export default GetVideo
