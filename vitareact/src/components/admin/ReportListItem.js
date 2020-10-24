import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios'

function ReportListItem({userId, reasonId}) {
    
    const [username, setUsername] = useState(null)
    const [reason, setReason] = useState(null)

    useEffect(() => {
        axiosInstance
            .get(`video/report-reason/${reasonId}/`)
            .then(res => {
                console.log(res);
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
                console.log(res);
                setUsername(res.data.username);
            });
    }, []);

    return (
        (username && reason) 
        ? (
            <ol>
                <li>{username} - {reason}</li>
            </ol>
        ) : (
            <>Loading</>
        )
    )
}

export default ReportListItem
