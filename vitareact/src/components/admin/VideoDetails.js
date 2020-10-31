import React from 'react';
import {useParams} from 'react-router-dom'
import GetVideo from '../GetVideo';
import DeleteVidCom from './DeleteVidCom';
import EditVideo from './EditVideo';
import ReportList from './ReportListVidCom';

// Video [id]
    // 1. Video player
    // 2. Video details [including comments] >> Reuse the GetVideo Components


function VideoDetails() {
    // get id from pramas 
    const {id} = useParams();

    return (
        <div>
            <h1><u>Video Details Page for Admin</u></h1>
            <EditVideo id={id} />
            <GetVideo />
            <ReportList type="video" id={id} />
            <DeleteVidCom type="Video" urlSuffix="video/video-list/" id={id} />
        </div>
    )
}

export default VideoDetails
