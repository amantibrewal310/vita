import React from 'react';
import {useParams} from 'react-router-dom'
import GetVideo from '../GetVideo';
import DeleteVidCom from './DeleteVidCom';
import EditVideo from './EditVideo';
import ReportList from './ReportListVidCom';

// Video [id]
    // 1. Video player
    // 2. Video details [including comments] >> Reuse the GetVideo Components
    // 3. Edit form [show live changes in displayed details]
    // 4. Delete option [confirmation by alert box]
    // 5. Report list [recent reports made]

function VideoDetails() {
    // get id from pramas 
    const {id} = useParams();

    return (
        <div>
            <h1><u>Video Details Page for Admin</u></h1>
            <EditVideo id={id} />
            <GetVideo />
            <DeleteVidCom type="Video" urlSuffix="video/video-list/" id={id} />
            <ReportList type="video" id={id} />
            {/* TODO: 5. */}
        </div>
    )
}

export default VideoDetails
