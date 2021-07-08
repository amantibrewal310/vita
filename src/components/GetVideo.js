import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import VideoPlayer from './VideoPlayer';
import AddComments from './AddComment';
import checkAdminLoggedIn from './auth/checkAdminLoggedIn';
import detailStyle from './css/videoDetails.module.css';
import Preloader from './utils/Preloader';
import Header from './Header';
import axiosInstance from '../axios';
import Popup from './utils/Popup';

// Get video data for a particular video 
// Get all comments on the video

/* 
    user none => no videos
    user free => videos free,
    user ent =>  videos free + ent, 
    user pro =>  videos free + ent + pro 
    admin => all

    - set admin logic
*/

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
    const [popUpState, setPopupState] = useState({
        message: '',
        show: false
    })

    const history = useHistory();

    /*
        check user membership and then decide to play
    */
    useEffect(() => {
        if(checkAdminLoggedIn()) {
            // admin can play all videos 
            getVideoPlayDetails()
        } else {
            // check for normal user
            checkUserMembershipBeforePlay()
        }
        
    }, []);

    
    /* 
        checks if user has valid membership to play video
    */
    const checkUserMembershipBeforePlay = async () => {
        // user details
        // get user data,request with token headers
        let res = await axiosInstance.get(`membership/user/type/`)
        let userMembershipType = res.data.membership_type;
        
        // user has no membership
        if(userMembershipType  === "None") {
            showPopUpAndRedirect('Please buy a membership plan to watch!')
            return;
        }
        
        // get video detail
        res = await axios.get(`http://127.0.0.1:8000/api/video/video-list/${id}/`)
        let allowed = res.data.allowed_membership

        // no membership allowed 
        if(allowed.length === 0) {
            showPopUpAndRedirect('The video is not available')
            return;
        }

        // video allows at least one membership 
        // so pro can watch

        if(userMembershipType === "Enterprise") {
            // videos neither available for free nor enterprise 
            if(!allowed.includes(1) && !allowed.includes(2)) {
                showPopUpAndRedirect('Only for Professional,Please upgrage your membership')
                return;
            }
        } else if(userMembershipType === "Free") {
            if(!allowed.includes(1)) {
                showPopUpAndRedirect('Free users cannot watch this video, Please Upgrade')
                return;
            }
        }
        // user can play video
        getVideoPlayDetails();
    }

    /* 
        get video data and comments for this video 
    */
    const getVideoPlayDetails = async () => {
        let res = await axios.get(`http://127.0.0.1:8000/api/video/video-list/${id}/`)
        // set video data 
        setVideoData({
            loading:false,
            video:res.data
        });

        // set comments data
        res = await axios.get(`http://127.0.0.1:8000/api/video/${id}/comments/`)
        setCommentsData({
            loading: false, 
            comments: res.data
        })
    }


    // redirect when user cannot play video
    const showPopUpAndRedirect = (message) => {
        setPopupState({
            message: message,
            show: true
        })
        setTimeout(() => {
            history.goBack();
        }, 2000)
    }


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
        <>
        <Header />
        <Popup show={popUpState.show} message={popUpState.message} type='fail' />
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
        </>
    )
}

export default GetVideo
