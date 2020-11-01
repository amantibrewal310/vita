import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios';
import ReportComment from './ReportVidCom';
import commentStyles from './css/commentStyles.module.css'
import preplayStyles from './css/videoPreplay.module.css'
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';
import CheckAdminLoggedIn from './auth/checkAdminLoggedIn';

// Returns a single comment
// props -> single comment object

function SingleComment({comment}) {
    // TODO: 
    // make a component that returns username from id, 
    // to display name of user that made comment 

    const initCountState = {
        commentLikes: comment.likes,
        commentDislikes: comment.dislikes
    }
    const initLikeState = {
        like: false,
        dislike: false
    }

    // using seperate states
    // combined state is causing errors in updates 
    const [likeState, setLikeState] = useState(initLikeState);
    const [countState, setCountState] = useState(initCountState);
    const [report, setReport] = useState(true);
    const [commentUser, setCommentUser] = useState('')

    useEffect(() => {
        getVoteStatus();
        getCommentUser();
    }, []);

    /* 
      check status of vote 
    */
    const getVoteStatus = () => {
        axiosInstance
        .post(`video/comment-vote/`, {
            comment: comment.id,
            action: 'checkStatus'
        })
        .then(res => {
            setVoteStatus(res.data.status);
        })
        .catch(err => {
            console.log(err);
        })
    }
    /*
      get name of user that made comment
    */
    const getCommentUser = () => {
        axiosInstance
            .get(`user/${comment.user}/`)
            .then(res => {
                setCommentUser(res.data.username)
            })
    }
    /* 
      set status for buttons to glow
    */
    const setVoteStatus = (status) => {
        // console.log('status: ' + status);
        if(status == 'like') {
            setLikeState({
                like: true,
                dislike: false
            });
        } else if(status == 'dislike') {
            setLikeState({
                like: false,
                dislike: true
            });
        } else {
            setLikeState({
                like: false,
                dislike: false
            });
        }
    }
    /* 
      get final likes/dislikes
    */
    const getVoteCount = () => {
        axiosInstance
            .get(`video/comment-list/${comment.id}/`)
            .then(res => {
                setCountState({
                    commentLikes: res.data.likes,
                    commentDislikes: res.data.dislikes
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    /*
      like/dislike pressed 
    */
    const handleVote = (action) => {
        const body = {
            comment: comment.id,
            action: action
        };
        axiosInstance
            .post(`video/comment-vote/`, body)
            .then(res => {
                console.log(res.data.status);
                setVoteStatus(res.data.status);
                getVoteCount();
            })
            .catch(err => {
                console.log(err);
            });
    }
    /*
        report
    */
    const toggleReportBtn = () => {
        setReport(!report);
    }

    return (
        <div className={commentStyles.commentItem}>
            {/* display user avatar and name like yt */}
            <div className={commentStyles.avatarBox}>
                <UserAvatar letter={commentUser.charAt(0)} />
            </div>
            
            <div className={commentStyles.restDetailsBox}>
                
                <p
                    className={commentStyles.userBox}
                >   
                    <b>{commentUser}</b>
                    {
                        CheckAdminLoggedIn() && (
                            <Link to={`../admin/comment-details/${comment.id}`}>
                                <button>View in Admin</button>
                            </Link>
                        )
                    }
                </p>
                <p>{comment.text}</p>
                
                <div className={preplayStyles.bottomVideoStats} style={{marginTop:'5px'}}>
                    <span className='vote-btn' onClick={() => handleVote('like')}>
                        <i className={"fa fa-thumbs-o-up" + (likeState.like ? " like" : "")} 
                            aria-hidden="true">
                        </i>
                        {countState.commentLikes}
                    </span>
                    <span className='vote-btn' onClick={() => handleVote('dislike')}> 
                        <i className={"fa fa-thumbs-o-down" + (likeState.dislike ? " dislike" : "")}
                            aria-hidden="true">
                        </i> 
                        {countState.commentDislikes}
                    </span>
                    <span> 
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {comment.created_at}
                    </span>
                    {/* report */}

                    { report ? (
                            <span 
                                className='report-btn' 
                                onClick={toggleReportBtn}
                                style={{float: 'right'}}
                            >
                                <i  className="fa fa-flag-o danger" 
                                    aria-hidden="true">
                                </i>
                                Report
                            </span>
                        ):(
                            <ReportComment type="comment" id={comment.id} toggleReportBtn={toggleReportBtn} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleComment
