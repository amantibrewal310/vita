import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios'
import Preloader from '../utils/Preloader';
import reportStyle from '../css/reports.module.css'
import UserAvatar from '../UserAvatar';

function ReportListItem({userId, reasonId}) {
    
    const [username, setUsername] = useState(null)
    const [reason, setReason] = useState(null)

    useEffect(() => {
        axiosInstance
            .get(`video/report-reason/${reasonId}/`)
            .then(res => {
                setReason(res.data.reason);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`user/${userId}/`)
            .then(res => {
                setUsername(res.data.username);
            });
    }, []);

    return (
        (username && reason) 
        ? (
            <div className={reportStyle.reportItem}>
                <div className={reportStyle.userInfo}>
                    <UserAvatar letter={username.charAt(0)}/>
                    <p>{username}</p>
                </div>
                <div>{reason}</div>
            </div>
        ) : (
            <div style={{width: '100vw', height: '80px'}}>
                <Preloader />
            </div>
        )
    )
}

export default ReportListItem
