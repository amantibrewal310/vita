import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../css/adminHome.css';
import axiosInstance from '../../axios';
import VideoResults from './VideoResults';
import CommentResults from './CommentResults';
import Header from '../Header';
import formStyles from '../css/forms.module.css'
import Preloader from '../utils/Preloader';

// Admin Options Avalailable 

// Video options
    // Features 
        // 3. Filter, Sort for videos [by most reported, date/time ... etc]

// Comment options
    // Featurs 
        // 1. Filter, Sort for videos [by most reported, date/time... etc]

function Admin() {

    const initHeading = {
        videoHeading: 'Recent Video Reports',
        commentHeading: 'Recent Comment Reports'
    }

    const [boxHeading, setBoxHeading] = useState(initHeading);
    const [videoResults, setVideoResults] = useState([]);
    const [commentResults, setCommentResults] = useState([]);
    const [videoResLoading, setVideoResLoadingLoading] = useState(true);
    const [commentResLoading, setCommentResLoading] = useState(true);

    useEffect(() => {
        // recent reported videos 
        axiosInstance
            .get(`video/reported-video-list/`)
            .then(res => {
                setVideoResults(res.data);
                setVideoResLoadingLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        // recent reported comments 
        axiosInstance
            .get(`video/reported-comment-list/`)
            .then(res => {
                setCommentResults(res.data);
                setCommentResLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <>
        <Header />
        <div>
            <h1 style={{textAlign:'center'}}>Admin Home</h1>
            
            <Link 
                to={`/admin/create`}>
                <button 
                    className={formStyles.submitBtn}>
                    Create New Video
                </button>
            </Link>

            <div style={{display: 'flex', justifyContent: 'center'}}>  
                <button className={formStyles.smallSubmitBtn}>Most views</button>
                <button className={formStyles.smallSubmitBtn}>Most Likes</button>
                <button className={formStyles.smallSubmitBtn}>Most Reported</button>
            </div>

            <div className="row">
                <div className="col">
                    <h2>{boxHeading.videoHeading}</h2>
                    {
                        (videoResLoading)
                        ? (
                            <div style={{width: '200px', height: '200px'}}>
                                <Preloader />
                            </div>
                        ) : (
                            <VideoResults allVideos={videoResults}/>
                        )
                    }
                </div>
                <div className="col">
                <h2>{boxHeading.commentHeading}</h2>
                    {
                        (commentResLoading)
                        ? (
                            <div style={{width: '200px', height: '200px'}}>
                                <Preloader />
                            </div>
                        ) : (
                            <CommentResults allComments={commentResults}/>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Admin
