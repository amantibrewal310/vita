import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios';
import ReportComment from './ReportVidCom';

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

    useEffect(() => {
        getVoteStatus();
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
        <div>
            {/* display user avatar and name like yt */}
            <span>By {comment.user}</span>
            <p>{comment.text}</p>
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
                    <span className='report-btn' onClick={toggleReportBtn}>
                        <i  className="fa fa-flag-o" 
                            aria-hidden="true">
                        </i>
                    </span>
                ):(
                    <ReportComment type="comment" id={comment.id} toggleReportBtn={toggleReportBtn} />
                )
            }
            <hr />
        </div>
    )
}

export default SingleComment
