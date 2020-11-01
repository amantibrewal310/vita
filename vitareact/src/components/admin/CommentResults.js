import React from 'react';
import {Link} from 'react-router-dom';
import reportStyles from '../css/reports.module.css'

function CommentResults({allComments}) {
    return (
        <div className={reportStyles.recentReportBox}>
            {
                allComments.map(comment => (
                    <Link
                        to = {`/admin/comment-report-action/${comment.id}`}
                        key = {comment.id}
                    >
                        <div className={reportStyles.recentReportVideo}>
                            <div className={reportStyles.commentText}>
                                <h6>{
                                    comment.text.length > 100
                                    ? `${comment.text.substr(
                                        0, 100
                                    )}...`
                                    : comment.text
                                }</h6>
                            </div>
                            <div className={reportStyles.stats}>
                                <span>
                                    <i className="fa fa-thumbs-o-up btn" aria-hidden="true"></i>
                                    {comment.likes}
                                </span>
                                <span>
                                    <i className="fa fa-thumbs-o-down btn" aria-hidden="true"></i>
                                    {comment.dislikes}
                                </span>
                                <span>
                                    <i className="fa fa-flag-o danger btn" aria-hidden="true"></i>
                                    {comment.reported}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default CommentResults
