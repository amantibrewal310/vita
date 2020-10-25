import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';

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
        <span>
            <label>
                <select value={reason} onChange={(e) => handleChange(e)}>
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
                </label>
            <button onClick={sendReport}>Report</button>
            <button onClick={() => toggleReportBtn()}>Cancel</button>
        </span>
      );
  
}

export default ReportVidCom
