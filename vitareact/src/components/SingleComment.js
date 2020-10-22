import React from 'react'

// Returns a single comment
// props -> single comment object

// Like/Dislike
    // 1. like/dislike only once
    // 2. User cannot like or dislike his own comment
    // 3. like/dislike toggle on consecutive clicks
        // - if like click
            // - if no like + 1
            // - if liked already - no change
            // - if dislike - remove dislike
        // - if dislike click
            // - if no dislik + 1
            // - if liked already - remove like
            // - if dislike - no change

function SingleComment({comment}) {
    // TODO: 
    // make a component that returns username from id, 
    // to display name of user that made comment 
    return (
        <div>
            {/* display user avatar and name like yt */}
            <span>By {comment.user}</span>
            <p>{comment.text}</p>
            <span>
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                {comment.likes}
            </span>
            <span>
                <i className="fa fa-thumbs-o-down" aria-hidden="true"></i> 
                {comment.dislikes}
            </span>
            <span> 
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                {comment.created_at}
            </span>
            <hr />
        </div>
    )
}

export default SingleComment
