import React from 'react';
import {useParams} from 'react-router-dom';
import GetSingleComment from '../GetSingleComment';
import DeleteVidCom from './DeleteVidCom';

// Comment [id]
    // 1. comment detail 
    // 2. Report List [recent reports on that comment] 
    // 3. Delete/Remove comment [confirmation by alert box]

function CommentDetail() {
    // get it from params
    const {id} = useParams();
    return (
        <div>
            <h1><u>Comment Details page for Admin</u></h1>
            <GetSingleComment id={id} />
            <DeleteVidCom type="Comment" urlSuffix="video/comment-list/" id={id} />
            {/* TODO: 2. */}
        </div>
    )
}

export default CommentDetail
