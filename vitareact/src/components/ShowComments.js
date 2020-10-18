
import React from 'react'

function ShowComments(props) {
    const comments = props.comments;

    // TODO: 
    // make a component that returns username from id, 
    // to display name of user that made comment 
    if(comments.length == 0) {
        return (
            <div>
                <h3>Comments</h3>
                <p>No comments</p>
            </div>
        )
    }
    return (
        <div>
            <h3>Comments</h3>
        {
            comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                    <span>likes: {comment.likes}</span>
                    <span>dislikes: {comment.dislikes}</span>
                    <p>By {comment.user}</p>
                    <hr />
                </div>
            ))
        }
        </div>
    )
}

export default ShowComments
