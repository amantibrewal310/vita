import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import ReportListItem from './ReportListItem'

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
            <>
                <h2>{type} report list</h2>
                <p>Loading..</p>
            </>
        )
    } else {
        return (
            <>
                <Link 
                    to={`/admin/${type}-report-action/${id}`}
                >
                    <h2>{type} report list</h2>
                </Link>
                
                {
                    (reportList.list.length == 0) 
                    ? (
                        <p>No Reports found.</p>
                    )
                    : (
                        reportList.list.map(item => (
                            <ReportListItem userId={item.user} reasonId={item.reason}/>
                        ))
                    )
                    
                }
            </>
        )
    }
}

export default ReportListVidCom
