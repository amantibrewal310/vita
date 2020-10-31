import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axiosInstance from '../../axios';
import ReportList from './ReportListVidCom';


function VideoReportAction() {
    const {id} = useParams();
    const history = useHistory();

    const handleAction = (action) => {
        const conf = window.confirm(`Are you sure to ${action} this?`);
        if(conf) {
            const body = {
                video_id: id,
                action: action
            }
            axiosInstance
                .post(`video/reported-video/final/`, body)
                .then(res => {
                    history.push('/admin');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <div style={{margin: '20px', float: 'right'}}>
                <button onClick={() => handleAction('approve')}>Approve</button>
                <button onClick={() => handleAction('decline')}>Decline</button>
            </div>
            <ReportList type="video" id={id} />
        </>
    )
}

export default VideoReportAction
