import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import formStyle from './css/forms.module.css'

function ReportVidCom({type, id, toggleReportBtn}) {

    const [reason, setReason] = useState(-1);
    const [options, setOptions] = useState([]);

    // fetch options 
    useEffect(() => {
        axiosInstance
            .get(`video/report-reason/`)
            .then(res => {
                setOptions(res.data);
            });
    }, []);

    // submit handler 
    const sendReport = () => {
        // check
        if(reason == -1) {
            return;
        }

        axiosInstance
            .post(`video/report-${type}/`, {
                [type]: id,
                reason: reason
            })
            .then(res => {
                toggleReportBtn()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className={formStyle.videoSelectInputContainer}>
                <select 
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)}
                    className={formStyle.input}
                    style={{color: 'white'}} 
                >
                    <option 
                        key='0'
                        value='-1'
                    > 
                        Select
                    </option>
                    {
                        options.map(option => (
                            <option 
                                key={option.id} 
                                value={option.id}
                            > 
                                {option.reason}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={formStyle.buttonBox}>
                <button 
                    onClick={sendReport} 
                    className={formStyle.smallSubmitBtn}>
                Report</button>
                <button 
                    onClick={() => toggleReportBtn()}
                    className={formStyle.smallDangerBtn}>
                Cancel</button>
            </div>
        </>
      );
  
}

export default ReportVidCom
