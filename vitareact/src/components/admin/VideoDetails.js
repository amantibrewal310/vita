import React from 'react';
import {Link, useParams} from 'react-router-dom'
import GetVideo from '../GetVideo';
import Header from '../Header';
import DeleteVidCom from './DeleteVidCom';
import EditVideo from './EditVideo';
import ReportList from './ReportListVidCom';
import formStyles from '../css/forms.module.css'

// Video [id]
    // 1. Video player
    // 2. Video details [including comments] >> Reuse the GetVideo Components

const detailBox = {
    paddingBottom: '40px'
}

const heading = {
    padding: '10px',
    textAlign: 'center'
}


function VideoDetails() {
    // get id from pramas 
    const {id} = useParams();

    return (
        <>
        <Header />
        <div style={detailBox}>
            
            <h1 style={heading}>Video Details</h1>
            <br />
            
            <EditVideo id={id} />
            
            <GetVideo />
            
            <h2 style={heading}>Report List</h2>
            <br />
            
            <ReportList type="video" id={id} />
            
            <Link to={`../video-report-action/${id}`}>
                <button 
                    className={formStyles.smallSubmitBtn}
                >
                    View Reports 
                </button>
            </Link>

            <DeleteVidCom type="Video" urlSuffix="video/video-list/" id={id} />
        
        </div>
        </>
    )
}

export default VideoDetails
