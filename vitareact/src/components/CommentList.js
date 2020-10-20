
import React from 'react';
import SingleComment from './SingleComment';
import {Link} from 'react-router-dom';

// Returns a list of comments 
// props -> array of comments 

function CommentList(props) {
    const comments = props.comments;

    if(comments.length == 0) {
        return (
            <div>
                <h3>Comments</h3>
                <p>No comments</p>
            </div>
        )
    }

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
        <h3>Comments</h3>
        {
            comments.map(comment => (
                <SingleComment key={comment.id} comment={comment} />
            ))
        }
        </div>
    )
}

export default CommentList
