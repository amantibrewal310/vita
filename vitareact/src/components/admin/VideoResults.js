import React from 'react';
import {Link} from 'react-router-dom';

function VideoResults({allVideos}) {
    // console.log(Array.isArray(allVideos));
    // if(allVideos.length == 0) {
    //     return <>No Results</>
    // }

    return (
        <>
            {
                (allVideos.length == 0) 
                ? (
                    <p>No Results found</p>
                )
                : (
                    allVideos.map(video => (
                        <Link
                            to = {`/admin/video-report-action/${video.id}`}
                            key = {video.id}
                        >
                            <div>
                                <div>
                                    <img src={video.thumbnail} alt="thumbnail" width="100px"/>
                                    <span> {video.title} </span>
                                </div>
                                <div>
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
                        </Link>
                    ))
                )
            }
        </>
    )
}

export default VideoResults
