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

    // select handler
    const handleChange = (e) => {
        console.log(e.target.value);
        setReason(e.target.value);
    }   
    // submit handler 
    const sendReport = () => {
        // check
        if(reason == -1) {
            console.log('choose a value');
            return;
        }

        axiosInstance
            .post(`video/report-${type}/`, {
                [type]: id,
                reason: reason
            })
            .then(res => {
                console.log(res);
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
                    onChange={(e) => handleChange(e)}
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
