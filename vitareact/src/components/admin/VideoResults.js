import React from 'react';
import {Link} from 'react-router-dom';
import reportStyles from '../css/reports.module.css'

function VideoResults({allVideos}) {
    
    return (
        <div className={reportStyles.recentReportBox}>
            {
                /* (allVideos.length == 0) 
                ? (
                    <p>No Results found</p>
                )
                : ( */

                    allVideos.map(video => (
                        <Link
                            to = {`/admin/video-report-action/${video.id}`}
                            key = {video.id}
                        >
                            <div className={reportStyles.recentReportVideo}>
                                
                                <img src={`http://127.0.0.1:8000${video.thumbnail}`} alt="thumbnail" width="120px"/>
                                
                                <div className={reportStyles.details}>
                                    <h6> {video.title} </h6>
                                    <div className={reportStyles.stats}>
                                        <span>
                                            <i className="fa fa-eye cool btn" aria-hidden="true"></i>
                                            {video.views}
                                        </span>
                                        <span>
                                            <i className="fa fa-thumbs-o-up btn" aria-hidden="true"></i>
                                            {video.likes}
                                        </span>
                                        <span>
                                            <i className="fa fa-thumbs-o-down btn" aria-hidden="true"></i>
                                            {video.dislikes}
                                        </span>
                                        <span>
                                            <i className="fa fa-flag-o danger btn" aria-hidden="true"></i>
                                            {video.reported}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                /* ) */
            }
        </div>
    )
}

export default VideoResults
