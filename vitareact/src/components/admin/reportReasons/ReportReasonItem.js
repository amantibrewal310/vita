import React, {useEffect, useState} from 'react'
import formStyles from '../../css/forms.module.css'
import axios from 'axios'

function ReportReasonList({item, refreshReasons}) {

    const [newReason, setNewReason] = useState(item.reason)
    const [showEditForm, setshowEditForm] = useState(false);

    const handleSubmit = () => {
        if(newReason === '') {
            return
        }
        
        axios
            .patch(`http://127.0.0.1:8000/api/video/report-reason/${item.id}/`, {
                reason: newReason
            })
            .then(res => {
                setNewReason('')
                setshowEditForm(false);
                refreshReasons()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <p>{item.reason}</p>
            
            <button
               onClick={() => setshowEditForm(!showEditForm)} 
            > Edit</button>

            {
                (showEditForm)
                ? (
                    <div>
                        <input 
                            className={formStyles.input}
                            type="text"
                            name="reason"
                            placeholder="new reason"  
                            value={newReason}
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
