
import React from 'react';
import SingleComment from './SingleComment';
import {Link} from 'react-router-dom';

// Returns a list of comments 
// props -> array of comments 

function CommentList({comments}) {

    const commentList = (comments.length == 0)
    ? (<></>)
    : (comments.map(comment => (
            <SingleComment key={comment.id} comment={comment} />
        ))
    )

    // if(logged in user is superuser) {
        // return (
        //     <div>
        //     <h3>Comments</h3>
        //     {
        //         comments.map(comment => (
        //             <Link to={`/admin/comment-detail/${comment.id}`}>
        //                 <SingleComment key={comment.id} comment={comment} />
        //             </Link>
        //         ))
        //     }
        //     </div>
        // )    
    // }

    return (
        <div>
            {commentList}
        </div>
    )
}

export default CommentList
