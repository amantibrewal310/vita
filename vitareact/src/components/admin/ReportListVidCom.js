import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import ReportListItem from './ReportListItem'
import Preloader from '../utils/Preloader';
import reportStyle from '../css/reports.module.css'

function ReportListVidCom({type, id}) {
    console.log(type);
    const initReportListData = {
        list : [],
        loading: true
    }
    const [reportList, setReportList] = useState(initReportListData);

    useEffect(() => {
        axiosInstance
            .get(`video/reported-${type}/${id}/`)
            .then(res => {
                setReportList({
                    list: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    if(reportList.loading) {
        return (
            <div style={{width: '100vw', height: '20vh'}}>
                <Preloader />
            </div>
        )
    } else {
        return (
            <>
            {
                (reportList.list.length == 0) 
                ? (
                    <p>No Reports found.</p>
                )
                : (
                    <>
                    <div className={reportStyle.reportHeading}>
                        <div><b>Reported By</b></div>
                        <div><b>Report Reason</b></div>
                    </div>
                    {
                        reportList.list.map(item => (
                            <ReportListItem userId={item.user} reasonId={item.reason}/>
                        ))
                    }
                    </>
                )
                
            }
            </>
        )
    }
}

export default ReportListVidCom
