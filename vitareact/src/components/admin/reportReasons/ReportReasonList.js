import React, {useEffect, useState} from 'react'
import formStyles from '../../css/forms.module.css'
import axios from 'axios'
import ReportReasonItem from './ReportReasonItem';


function ReportReasonList() {

    const [reasons, setReasons] = useState([])
    const [newReason, setNewReason] = useState()
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        refreshReasons();
    })

    const refreshReasons = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/video/report-reason/`)
        setReasons(res.data)
    }

    const handleSubmit = () => {
        if(newReason === '') {
            return
        }
        
        axios
            .post(`http://127.0.0.1:8000/api/video/report-reason/`, {
                reason: newReason
            })
            .then(res => {
                setNewReason('')
                setShowCreateForm(false);
                refreshReasons()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            {
                reasons.map(item => (
                    <ReportReasonItem 
                        key={item.id} 
                        item={item} 
                        refreshReasons={refreshReasons} 
                    />
                ))
            }

            <button
               onClick={() => setShowCreateForm(!showCreateForm)} 
            > Create New Reason</button>

            {
                (showCreateForm)
                ? (
                    <div>
                        <input 
                            className={formStyles.input}
                            type="text"
                            name="reason"
                            placeholder="new reason"  
                            onChange={(e) => setNewReason(e.target.value)}
                        />

                        <button
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                ): (
                    <></>
                )
            }

        </div>
    )
}

export default ReportReasonList
