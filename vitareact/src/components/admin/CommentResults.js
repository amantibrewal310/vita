import React from 'react';
import {Link} from 'react-router-dom';

function CommentResults({allComments}) {
    return (
        <>
            {
                allComments.map(comment => (
                    <Link
                        to = {`/admin/comment-details/${comment.id}`}
                        key = {comment.id}
                    >
                        <div>
                            <h3>{comment.text}</h3>
                            <div>
                                <span>
                                    <i className="fa fa-thumbs-o-up btn" aria-hidden="true"></i>
                                    {comment.likes}
                                </span>
                                <span>
                                    <i className="fa fa-thumbs-o-down btn" aria-hidden="true"></i>
                                    {comment.dislikes}
                                </span>
                                <span>
                                    <i className="fa fa-flag-o btn" aria-hidden="true"></i>
                                    {comment.reported}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </>
    )
}

export default CommentResults
