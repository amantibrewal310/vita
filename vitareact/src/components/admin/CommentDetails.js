import React from 'react';
import {useParams} from 'react-router-dom';
import GetSingleComment from '../GetSingleComment';
import Header from '../Header';
import DeleteComment from './DeleteVidCom';
import ReportList from './ReportListVidCom'; 

// TODO: 
// display the video details too on which this comment was made 
function CommentDetail() {
    // get it from params
    const {id} = useParams();
    return (
        <>
        <Header />
        <div>
            <h1><u>Comment Details page for Admin</u></h1>
            <GetSingleComment id={id} />
            <DeleteComment type="Comment" urlSuffix="video/comment-list/" id={id} />
            <ReportList type="comment" id={id}/>
        </div>
        </>
    )
}

export default CommentDetail
