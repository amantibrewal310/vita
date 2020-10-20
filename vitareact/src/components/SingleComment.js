import React from 'react'

// Returns a single comment
// props -> single comment object

function SingleComment({comment}) {
    // TODO: 
    // make a component that returns username from id, 
    // to display name of user that made comment 
    return (
        <div>
            <p>{comment.text}</p>
            <span>likes: {comment.likes}</span>
            <span>dislikes: {comment.dislikes}</span>
            <p>By {comment.user}</p>
            <hr />
        </div>
    )
}

export default SingleComment
